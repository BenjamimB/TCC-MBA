/**
 * Suite IT-P — Cadastro de pacientes com banco real
 * Task: 4.1 | Requirements: idempotência, autorização, LGPD
 *
 * PostgreSQL: real | Redis: real
 * PatientService testado via DI (sem controller HTTP para pacientes na V1)
 */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/infra/prisma.service';
import { PatientService } from '../../src/patient/patient.service';

let app: INestApplication;
let prisma: PrismaService;
let patientService: PatientService;
let profAId: string;
let profBId: string;

async function truncate() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "interaction_record", "appointment", "patient", "professional"
    RESTART IDENTITY CASCADE
  `);
}

async function createProfessional(email: string): Promise<string> {
  const prof = await prisma.professional.create({
    data: {
      email,
      name: 'Dr. Test',
      passwordHash: '$2b$10$placeholderHashForTests',
      emailVerifiedAt: new Date(),
    },
  });
  return prof.id;
}

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = module.createNestApplication();
  await app.init();
  prisma = app.get(PrismaService);
  patientService = app.get(PatientService);
});

beforeEach(async () => {
  await truncate();
  profAId = await createProfessional('prof-a@test.com');
  profBId = await createProfessional('prof-b@test.com');
});

afterAll(async () => { await app.close(); });

// ---------------------------------------------------------------------------

describe('IT-P — Patient (integração)', () => {

  const PHONE = '+5511999990001';

  // Partição P1 (válida): criação com consentimento
  it('[IT-P-01] primeiro contato cria paciente com consentRecordedAt preenchido', async () => {
    const result = await patientService.findOrCreateByPhone(profAId, PHONE);

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const row = await prisma.patient.findUnique({ where: { id: result.value.id } });
    expect(row).not.toBeNull();
    expect(row!.consentRecordedAt).not.toBeNull();
    expect(row!.phoneNumber).toBe(PHONE);
    expect(row!.professionalId).toBe(profAId);
  });

  // Partição P2 (válida): idempotência
  it('[IT-P-02] segundo contato com mesmo telefone retorna mesmo paciente (idempotência)', async () => {
    const result1 = await patientService.findOrCreateByPhone(profAId, PHONE);
    const result2 = await patientService.findOrCreateByPhone(profAId, PHONE);

    expect(result1.ok).toBe(true);
    expect(result2.ok).toBe(true);
    if (!result1.ok || !result2.ok) return;

    expect(result1.value.id).toBe(result2.value.id);

    const count = await prisma.patient.count({ where: { professionalId: profAId, phoneNumber: PHONE } });
    expect(count).toBe(1);
  });

  // Partição P3: UNIQUE constraint
  it('[IT-P-03] UNIQUE constraint (professionalId, phoneNumber) impede duplicata direta no banco', async () => {
    await prisma.patient.create({
      data: { professionalId: profAId, phoneNumber: PHONE, consentRecordedAt: new Date() },
    });

    await expect(
      prisma.patient.create({
        data: { professionalId: profAId, phoneNumber: PHONE, consentRecordedAt: new Date() },
      }),
    ).rejects.toThrow();
  });

  // Partição P4 (válida): update de perfil
  it('[IT-P-04] updateProfile() persiste nome e data de nascimento no banco', async () => {
    const createResult = await patientService.findOrCreateByPhone(profAId, PHONE);
    expect(createResult.ok).toBe(true);
    if (!createResult.ok) return;

    const dob = new Date('1985-06-15');
    const updateResult = await patientService.updateProfile(createResult.value.id, profAId, {
      name: 'João da Silva',
      dateOfBirth: dob,
    });

    expect(updateResult.ok).toBe(true);
    if (!updateResult.ok) return;

    const row = await prisma.patient.findUnique({ where: { id: createResult.value.id } });
    expect(row!.name).toBe('João da Silva');
    expect(row!.dateOfBirth?.toISOString().slice(0, 10)).toBe('1985-06-15');
  });

  // Partição P5 (segurança): profissional B não acessa paciente de A
  it('[IT-P-05] profissional B não acessa paciente do profissional A', async () => {
    const createResult = await patientService.findOrCreateByPhone(profAId, PHONE);
    expect(createResult.ok).toBe(true);
    if (!createResult.ok) return;

    const getResult = await patientService.getById(createResult.value.id, profBId);
    expect(getResult.ok).toBe(false);
    if (getResult.ok) return;

    expect(getResult.error.code).toBe('UNAUTHORIZED');
  });

  // Partição P6 (LGPD): anonimização
  it('[IT-P-06] anonymize() substitui dados pessoais por hash', async () => {
    const createResult = await patientService.findOrCreateByPhone(profAId, PHONE);
    expect(createResult.ok).toBe(true);
    if (!createResult.ok) return;

    await patientService.updateProfile(createResult.value.id, profAId, { name: 'Maria Test' });

    const anonResult = await patientService.anonymize(createResult.value.id, profAId);
    expect(anonResult.ok).toBe(true);

    const row = await prisma.patient.findUnique({ where: { id: createResult.value.id } });
    expect(row!.name).toBeNull();
    expect(row!.phoneNumber).not.toBe(PHONE); // hash, não o telefone original
    expect(row!.anonymizedAt).not.toBeNull();
  });
});

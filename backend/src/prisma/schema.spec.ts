/**
 * Task 1.2 — Schema Prisma tests
 *
 * Validates the Prisma schema structure using @prisma/internals DMMF.
 * No DB connection required.
 */
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const SCHEMA_PATH = path.resolve(__dirname, '../../prisma/schema.prisma');
const schemaContent = fs.readFileSync(SCHEMA_PATH, 'utf-8');

/**
 * Checks whether a model block in the schema contains a given @@unique directive
 * with the specified fields.
 */
function modelHasUniqueDirective(modelName: string, fields: string[]): boolean {
  const fieldList = fields.join(', ');
  const pattern = new RegExp(
    `model\\s+${modelName}\\s*\\{[^}]*@@unique\\(\\[${fieldList}\\]\\)`,
    's',
  );
  return pattern.test(schemaContent);
}

/**
 * Checks whether a model block contains a given @@index directive.
 */
function modelHasIndexDirective(modelName: string, fields: string[]): boolean {
  const fieldList = fields.join(', ');
  const pattern = new RegExp(
    `model\\s+${modelName}\\s*\\{[^}]*@@index\\(\\[${fieldList}\\]\\)`,
    's',
  );
  return pattern.test(schemaContent);
}

/**
 * Returns the line in a model block that declares a given field.
 */
function getFieldLine(modelName: string, fieldName: string): string | undefined {
  const modelMatch = new RegExp(
    `model\\s+${modelName}\\s*\\{([^}]*)\\}`,
    's',
  ).exec(schemaContent);
  if (!modelMatch) return undefined;
  const lines = modelMatch[1].split('\n');
  return lines.find((l) => new RegExp(`\\b${fieldName}\\b`).test(l));
}

function modelExists(modelName: string): boolean {
  return new RegExp(`^model\\s+${modelName}\\s*\\{`, 'm').test(schemaContent);
}

describe('Prisma Schema — Task 1.2', () => {
  // TC-F-01: Schema válido via prisma validate
  it('[TC-F-01] schema Prisma deve ser válido (prisma validate)', () => {
    const backendDir = path.resolve(__dirname, '../..');
    expect(() =>
      execSync('npx prisma validate', { stdio: 'pipe', cwd: backendDir }),
    ).not.toThrow();
  });

  // TC-F-06: todos os modelos obrigatórios existem
  it('[TC-F-06] todos os modelos obrigatórios devem existir no schema', () => {
    const required = [
      'Professional', 'OauthAccount', 'Availability', 'CalendarSync',
      'Patient', 'Appointment', 'WaitlistEntry', 'Conversation',
      'Message', 'InteractionRecord', 'Subscription', 'Payment', 'AuditLog',
    ];
    for (const name of required) {
      expect(modelExists(name)).toBe(true);
    }
  });

  // TC-F-02: UNIQUE(professional_id, phone_number) em Patient
  it('[TC-F-02] modelo Patient deve ter @@unique em [professionalId, phoneNumber]', () => {
    expect(modelHasUniqueDirective('Patient', ['professionalId', 'phoneNumber'])).toBe(true);
  });

  // TC-F-03: UNIQUE(professional_id, start_at) em Appointment
  it('[TC-F-03] modelo Appointment deve ter @@unique em [professionalId, startAt]', () => {
    expect(modelHasUniqueDirective('Appointment', ['professionalId', 'startAt'])).toBe(true);
  });

  // TC-F-04: índice por startAt em Appointment
  it('[TC-F-04] modelo Appointment deve ter @@index em [professionalId, startAt]', () => {
    expect(modelHasIndexDirective('Appointment', ['professionalId', 'startAt'])).toBe(true);
  });

  // TC-F-05: AuditLog não tem updatedAt (append-only)
  it('[TC-F-05] modelo AuditLog não deve ter campo updatedAt', () => {
    const line = getFieldLine('AuditLog', 'updatedAt');
    expect(line).toBeUndefined();
  });

  // TC-S-01: totpSecret é Bytes
  it('[TC-S-01] campo totpSecret em Professional deve ser do tipo Bytes', () => {
    const line = getFieldLine('Professional', 'totpSecret');
    expect(line).toBeDefined();
    expect(line).toContain('Bytes');
  });

  // TC-S-02: OauthAccount usa encryptedAccessToken, não accessToken
  it('[TC-S-02] modelo OauthAccount deve ter encryptedAccessToken e não accessToken em claro', () => {
    const encrypted = getFieldLine('OauthAccount', 'encryptedAccessToken');
    const plain = getFieldLine('OauthAccount', 'accessToken');
    expect(encrypted).toBeDefined();
    expect(plain).toBeUndefined();
  });
});

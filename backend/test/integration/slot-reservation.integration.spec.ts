/**
 * Suite IT-SR — Lock atômico Redis com concorrência real
 * Task: 7.2 | Requirements: atomicidade SET NX, script Lua, concorrência
 *
 * Redis: real | PostgreSQL: não necessário
 * Valida que testes unitários com mock não conseguem validar (comportamento real do Redis)
 */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { SlotReservationService } from '../../src/booking/slot-reservation.service';
import { RedisService } from '../../src/infra/redis.service';

let app: INestApplication;
let reservationService: SlotReservationService;
let redis: RedisService;

async function flushRedis() {
  await redis.client.flushdb();
}

beforeAll(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = module.createNestApplication();
  await app.init();
  reservationService = app.get(SlotReservationService);
  redis = app.get(RedisService);
});

beforeEach(async () => {
  await flushRedis();
});

afterAll(async () => { await app.close(); });

// ---------------------------------------------------------------------------

describe('IT-SR — Slot Reservation (integração)', () => {

  // Partição P1 (válida): reserve persiste e expira no TTL
  it('[IT-SR-01] reserve() com Redis real persiste o lock e expira pelo TTL', async () => {
    const slotId = 'prof-1:2099-01-01:0900';
    const sessionId = 'session-abc';

    const result = await reservationService.reserve(slotId, sessionId, 2); // TTL 2s
    expect(result.ok).toBe(true);

    const val = await redis.client.get(`slot:${slotId}`);
    expect(val).toBe(sessionId);

    // Aguarda expiração
    await new Promise((res) => setTimeout(res, 2500));

    const expired = await redis.client.get(`slot:${slotId}`);
    expect(expired).toBeNull();
  }, 10_000);

  // Partição P2 (válida): release remove apenas o lock do owner
  it('[IT-SR-02] release() com Lua script remove apenas o lock do owner correto', async () => {
    const slotId = 'prof-1:2099-01-01:1000';
    const sessionA = 'session-a';
    const sessionB = 'session-b';

    await reservationService.reserve(slotId, sessionA, 60);

    // Sessão B não consegue remover
    const releaseByB = await reservationService.release(slotId, sessionB);
    expect(releaseByB.ok).toBe(false);
    if (releaseByB.ok) return;
    expect(releaseByB.error.code).toBe('UNAUTHORIZED');

    // Lock ainda existe
    const val = await redis.client.get(`slot:${slotId}`);
    expect(val).toBe(sessionA);

    // Sessão A remove com sucesso
    const releaseByA = await reservationService.release(slotId, sessionA);
    expect(releaseByA.ok).toBe(true);

    const afterRelease = await redis.client.get(`slot:${slotId}`);
    expect(afterRelease).toBeNull();
  });

  // Partição P3 (CONCORRÊNCIA): exatamente 1 de 10 simultâneos obtém o lock
  it('[IT-SR-03] 10 chamadas simultâneas a reserve() — exatamente 1 ok, 9 SLOT_NOT_AVAILABLE', async () => {
    const slotId = 'prof-1:2099-01-01:1100';

    const results = await Promise.all(
      Array.from({ length: 10 }, (_, i) =>
        reservationService.reserve(slotId, `session-${i}`, 60)
      ),
    );

    const successes = results.filter((r) => r.ok);
    const failures = results.filter((r) => !r.ok);

    expect(successes.length).toBe(1);
    expect(failures.length).toBe(9);

    failures.forEach((f) => {
      if (!f.ok) expect(f.error.code).toBe('SLOT_NOT_AVAILABLE');
    });
  });

  // Partição P4 (válida): lock expirado pode ser reservado novamente
  it('[IT-SR-04] lock expirado por TTL torna slot disponível para nova reserva', async () => {
    const slotId = 'prof-1:2099-01-01:1200';

    await reservationService.reserve(slotId, 'session-old', 1); // TTL 1s

    await new Promise((res) => setTimeout(res, 1500));

    const newReserve = await reservationService.reserve(slotId, 'session-new', 60);
    expect(newReserve.ok).toBe(true);
  }, 10_000);

  // Partição P5 (válida): extend renova TTL do owner correto
  it('[IT-SR-05] extend() renova TTL apenas do owner correto', async () => {
    const slotId = 'prof-1:2099-01-01:1300';
    const session = 'session-owner';

    await reservationService.reserve(slotId, session, 5);

    const extendOk = await reservationService.extend(slotId, session, 60);
    expect(extendOk.ok).toBe(true);

    const ttl = await redis.client.ttl(`slot:${slotId}`);
    expect(ttl).toBeGreaterThan(55);

    // Sessão errada não consegue estender
    const extendWrong = await reservationService.extend(slotId, 'wrong-session', 60);
    expect(extendWrong.ok).toBe(false);
  });

  // Partição P6 (válida): isReserved reflete estado do Redis
  it('[IT-SR-06] isReserved() reflete estado real do Redis', async () => {
    const slotId = 'prof-1:2099-01-01:1400';

    expect(await reservationService.isReserved(slotId)).toBe(false);

    await reservationService.reserve(slotId, 'session-x', 60);
    expect(await reservationService.isReserved(slotId)).toBe(true);

    await reservationService.release(slotId, 'session-x');
    expect(await reservationService.isReserved(slotId)).toBe(false);
  });
});

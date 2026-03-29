import { HealthService, DatabaseProbe, RedisProbe, HealthResult } from './health.service';

describe('HealthService', () => {
  let dbProbe: jest.Mocked<DatabaseProbe>;
  let redisProbe: jest.Mocked<RedisProbe>;
  let service: HealthService;

  beforeEach(() => {
    dbProbe = { ping: jest.fn() };
    redisProbe = { ping: jest.fn() };
    service = new HealthService(dbProbe, redisProbe);
  });

  // Partição P1 (válida): ambas dependências UP
  it('[TC-F-01] deve retornar status ok quando PostgreSQL e Redis estão acessíveis', async () => {
    dbProbe.ping.mockResolvedValue(undefined);
    redisProbe.ping.mockResolvedValue(undefined);

    const result: HealthResult = await service.check();

    expect(result.status).toBe('ok');
    expect(result.postgres).toBe('up');
    expect(result.redis).toBe('up');
  });

  // Partição P2 (inválida): PostgreSQL DOWN
  it('[TC-F-02] deve retornar status error quando PostgreSQL está indisponível', async () => {
    dbProbe.ping.mockRejectedValue(new Error('Connection refused'));
    redisProbe.ping.mockResolvedValue(undefined);

    const result: HealthResult = await service.check();

    expect(result.status).toBe('error');
    expect(result.postgres).toBe('down');
    expect(result.redis).toBe('up');
  });

  // Partição P3 (inválida): Redis DOWN
  it('[TC-F-03] deve retornar status error quando Redis está indisponível', async () => {
    dbProbe.ping.mockResolvedValue(undefined);
    redisProbe.ping.mockRejectedValue(new Error('ECONNREFUSED'));

    const result: HealthResult = await service.check();

    expect(result.status).toBe('error');
    expect(result.postgres).toBe('up');
    expect(result.redis).toBe('down');
  });

  // Partição P4 (edge): ambos DOWN
  it('[TC-F-04] deve retornar status error quando PostgreSQL e Redis estão indisponíveis', async () => {
    dbProbe.ping.mockRejectedValue(new Error('DB down'));
    redisProbe.ping.mockRejectedValue(new Error('Redis down'));

    const result: HealthResult = await service.check();

    expect(result.status).toBe('error');
    expect(result.postgres).toBe('down');
    expect(result.redis).toBe('down');
  });

  // Partições P1-P4: corpo inclui todos os campos esperados
  it('[TC-F-05] deve incluir campos status, postgres e redis em todos os cenários', async () => {
    dbProbe.ping.mockResolvedValue(undefined);
    redisProbe.ping.mockResolvedValue(undefined);

    const result: HealthResult = await service.check();

    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('postgres');
    expect(result).toHaveProperty('redis');
  });

  // TC-R-01: não lança exceção quando probe do PostgreSQL rejeita
  it('[TC-R-01] não deve lançar exceção quando probe do PostgreSQL rejeita', async () => {
    dbProbe.ping.mockRejectedValue(new Error('Fatal DB error'));
    redisProbe.ping.mockResolvedValue(undefined);

    await expect(service.check()).resolves.not.toThrow();
  });

  // TC-R-02: não lança exceção quando probe do Redis rejeita
  it('[TC-R-02] não deve lançar exceção quando probe do Redis rejeita', async () => {
    dbProbe.ping.mockResolvedValue(undefined);
    redisProbe.ping.mockRejectedValue(new Error('Fatal Redis error'));

    await expect(service.check()).resolves.not.toThrow();
  });

  // TC-U-01: resposta de erro tem status "error"
  it('[TC-U-01] resposta de erro deve conter status "error" e não stack trace', async () => {
    dbProbe.ping.mockRejectedValue(new Error('crash'));
    redisProbe.ping.mockRejectedValue(new Error('crash'));

    const result: HealthResult = await service.check();

    expect(result.status).toBe('error');
    expect(result).not.toHaveProperty('stack');
    expect(result).not.toHaveProperty('message');
  });

  // TC-U-02: resposta de sucesso tem status "ok"
  it('[TC-U-02] resposta de sucesso deve conter status "ok"', async () => {
    dbProbe.ping.mockResolvedValue(undefined);
    redisProbe.ping.mockResolvedValue(undefined);

    const result: HealthResult = await service.check();

    expect(result.status).toBe('ok');
  });
});

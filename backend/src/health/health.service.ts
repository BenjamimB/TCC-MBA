export interface DatabaseProbe {
  ping(): Promise<void>;
}

export interface RedisProbe {
  ping(): Promise<void>;
}

export interface HealthResult {
  status: 'ok' | 'error';
  postgres: 'up' | 'down';
  redis: 'up' | 'down';
}

export class HealthService {
  constructor(
    private readonly dbProbe: DatabaseProbe,
    private readonly redisProbe: RedisProbe,
  ) {}

  async check(): Promise<HealthResult> {
    const [postgresStatus, redisStatus] = await Promise.all([
      this.dbProbe.ping().then(() => 'up' as const).catch(() => 'down' as const),
      this.redisProbe.ping().then(() => 'up' as const).catch(() => 'down' as const),
    ]);

    const status = postgresStatus === 'up' && redisStatus === 'up' ? 'ok' : 'error';

    return { status, postgres: postgresStatus, redis: redisStatus };
  }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthService = void 0;
class HealthService {
    dbProbe;
    redisProbe;
    constructor(dbProbe, redisProbe) {
        this.dbProbe = dbProbe;
        this.redisProbe = redisProbe;
    }
    async check() {
        const [postgresStatus, redisStatus] = await Promise.all([
            this.dbProbe.ping().then(() => 'up').catch(() => 'down'),
            this.redisProbe.ping().then(() => 'up').catch(() => 'down'),
        ]);
        const status = postgresStatus === 'up' && redisStatus === 'up' ? 'ok' : 'error';
        return { status, postgres: postgresStatus, redis: redisStatus };
    }
}
exports.HealthService = HealthService;
//# sourceMappingURL=health.service.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotReservationService = void 0;
const result_1 = require("../shared/result");
const SLOT_KEY_PREFIX = 'slot:';
const DEFAULT_TTL_SECONDS = 600;
class SlotReservationService {
    redis;
    constructor(redis) {
        this.redis = redis;
    }
    async reserve(slotId, sessionId, ttlSeconds = DEFAULT_TTL_SECONDS) {
        const key = `${SLOT_KEY_PREFIX}${slotId}`;
        const acquired = await this.redis.setNxEx(key, sessionId, ttlSeconds);
        if (!acquired) {
            return (0, result_1.err)({ code: 'SLOT_NOT_AVAILABLE', slotId });
        }
        return (0, result_1.ok)(undefined);
    }
    async release(slotId, sessionId) {
        const key = `${SLOT_KEY_PREFIX}${slotId}`;
        const deleted = await this.redis.atomicDelete(key, sessionId);
        if (!deleted) {
            return (0, result_1.err)({ code: 'UNAUTHORIZED' });
        }
        return (0, result_1.ok)(undefined);
    }
    async extend(slotId, sessionId, ttlSeconds) {
        const key = `${SLOT_KEY_PREFIX}${slotId}`;
        const renewed = await this.redis.atomicExpire(key, sessionId, ttlSeconds);
        if (!renewed) {
            return (0, result_1.err)({ code: 'UNAUTHORIZED' });
        }
        return (0, result_1.ok)(undefined);
    }
    async isReserved(slotId) {
        const key = `${SLOT_KEY_PREFIX}${slotId}`;
        const value = await this.redis.get(key);
        return value !== null;
    }
}
exports.SlotReservationService = SlotReservationService;
//# sourceMappingURL=slot-reservation.service.js.map
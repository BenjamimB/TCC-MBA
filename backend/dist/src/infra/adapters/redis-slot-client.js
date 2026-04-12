"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisSlotClient = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../redis.service");
const RELEASE_SCRIPT = `
if redis.call("get", KEYS[1]) == ARGV[1] then
  return redis.call("del", KEYS[1])
else
  return 0
end
`;
const EXTEND_SCRIPT = `
if redis.call("get", KEYS[1]) == ARGV[1] then
  return redis.call("expire", KEYS[1], ARGV[2])
else
  return 0
end
`;
let RedisSlotClient = class RedisSlotClient {
    redis;
    constructor(redis) {
        this.redis = redis;
    }
    async setNxEx(key, value, ttlSeconds) {
        const result = await this.redis.client.set(key, value, 'EX', ttlSeconds, 'NX');
        return result === 'OK';
    }
    async get(key) {
        return this.redis.client.get(key);
    }
    async atomicDelete(key, expectedValue) {
        const result = await this.redis.client.eval(RELEASE_SCRIPT, 1, key, expectedValue);
        return result === 1;
    }
    async atomicExpire(key, expectedValue, ttlSeconds) {
        const result = await this.redis.client.eval(EXTEND_SCRIPT, 1, key, expectedValue, String(ttlSeconds));
        return result === 1;
    }
    async isReserved(slotId) {
        const key = `slot:${slotId}`;
        const value = await this.redis.client.get(key);
        return value !== null;
    }
};
exports.RedisSlotClient = RedisSlotClient;
exports.RedisSlotClient = RedisSlotClient = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], RedisSlotClient);
//# sourceMappingURL=redis-slot-client.js.map
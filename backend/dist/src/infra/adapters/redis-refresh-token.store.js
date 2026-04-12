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
exports.RedisRefreshTokenStore = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../redis.service");
let RedisRefreshTokenStore = class RedisRefreshTokenStore {
    redis;
    constructor(redis) {
        this.redis = redis;
    }
    async store(token, professionalId, ttlSeconds) {
        await this.redis.client.set(`refresh:${token}`, professionalId, 'EX', ttlSeconds);
    }
    async find(token) {
        return this.redis.client.get(`refresh:${token}`);
    }
    async delete(token) {
        await this.redis.client.del(`refresh:${token}`);
    }
};
exports.RedisRefreshTokenStore = RedisRefreshTokenStore;
exports.RedisRefreshTokenStore = RedisRefreshTokenStore = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], RedisRefreshTokenStore);
//# sourceMappingURL=redis-refresh-token.store.js.map
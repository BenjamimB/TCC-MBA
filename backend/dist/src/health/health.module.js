"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthModule = void 0;
const common_1 = require("@nestjs/common");
const health_controller_1 = require("./health.controller");
const health_service_1 = require("./health.service");
const prisma_health_probe_1 = require("./probes/prisma-health.probe");
const redis_health_probe_1 = require("./probes/redis-health.probe");
let HealthModule = class HealthModule {
};
exports.HealthModule = HealthModule;
exports.HealthModule = HealthModule = __decorate([
    (0, common_1.Module)({
        controllers: [health_controller_1.HealthController],
        providers: [
            prisma_health_probe_1.PrismaHealthProbe,
            redis_health_probe_1.RedisHealthProbe,
            {
                provide: health_service_1.HealthService,
                useFactory: (db, redis) => new health_service_1.HealthService(db, redis),
                inject: [prisma_health_probe_1.PrismaHealthProbe, redis_health_probe_1.RedisHealthProbe],
            },
        ],
    })
], HealthModule);
//# sourceMappingURL=health.module.js.map
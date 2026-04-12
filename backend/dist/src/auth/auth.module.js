"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const prisma_professional_repository_1 = require("../infra/adapters/prisma-professional.repository");
const bcrypt_hashing_service_1 = require("../infra/adapters/bcrypt-hashing.service");
const jwt_token_service_1 = require("../infra/adapters/jwt-token.service");
const redis_refresh_token_store_1 = require("../infra/adapters/redis-refresh-token.store");
const no_op_notification_service_1 = require("../infra/adapters/no-op-notification.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        providers: [
            {
                provide: auth_service_1.AuthService,
                useFactory: (repo, hashing, tokens, refreshStore, notifications) => new auth_service_1.AuthService(repo, hashing, tokens, refreshStore, notifications),
                inject: [
                    prisma_professional_repository_1.PrismaProfessionalRepository,
                    bcrypt_hashing_service_1.BcryptHashingService,
                    jwt_token_service_1.JwtTokenService,
                    redis_refresh_token_store_1.RedisRefreshTokenStore,
                    no_op_notification_service_1.NoOpNotificationService,
                ],
            },
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map
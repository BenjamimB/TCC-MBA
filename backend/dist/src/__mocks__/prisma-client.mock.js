"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaClient = void 0;
class PrismaClient {
    $connect = jest.fn().mockResolvedValue(undefined);
    $disconnect = jest.fn().mockResolvedValue(undefined);
    $transaction = jest.fn();
}
exports.PrismaClient = PrismaClient;
//# sourceMappingURL=prisma-client.mock.js.map
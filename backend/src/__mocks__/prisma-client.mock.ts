/**
 * Mock CJS-compatible do PrismaClient para testes Jest.
 * Necessário porque o cliente gerado pelo Prisma 7 usa import.meta (ESM).
 */
export class PrismaClient {
  $connect = jest.fn().mockResolvedValue(undefined);
  $disconnect = jest.fn().mockResolvedValue(undefined);
  $transaction = jest.fn();
}

export interface IRedisSlotClient {
  /** SET slot:{key} {value} NX EX {ttl} → true se reservou, false se já existia */
  setNxEx(key: string, value: string, ttlSeconds: number): Promise<boolean>;
  get(key: string): Promise<string | null>;
  /** Deleta a chave atomicamente somente se o valor atual === expectedValue (Lua script) */
  atomicDelete(key: string, expectedValue: string): Promise<boolean>;
  /** Renova TTL da chave somente se valor atual === expectedValue (Lua script) */
  atomicExpire(key: string, expectedValue: string, ttlSeconds: number): Promise<boolean>;
}

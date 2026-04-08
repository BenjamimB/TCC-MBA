export interface IRefreshTokenStore {
  store(token: string, professionalId: string, ttlSeconds: number): Promise<void>;
  find(token: string): Promise<string | null>;
  delete(token: string): Promise<void>;
}

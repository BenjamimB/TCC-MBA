import type { IHashingService } from '../../auth/ports/hashing.service.port';
export declare class BcryptHashingService implements IHashingService {
    private readonly COST;
    hash(plain: string): Promise<string>;
    compare(plain: string, hashed: string): Promise<boolean>;
}

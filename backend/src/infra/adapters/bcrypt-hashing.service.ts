import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { IHashingService } from '../../auth/ports/hashing.service.port';

@Injectable()
export class BcryptHashingService implements IHashingService {
  private readonly COST = 12;

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.COST);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}

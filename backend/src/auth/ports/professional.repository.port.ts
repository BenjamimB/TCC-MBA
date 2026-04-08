import type { ProfessionalRecord } from '../auth.types';

export interface CreateProfessionalData {
  email: string;
  name: string;
  passwordHash: string;
  emailVerifyToken: string;
}

export interface UpdateProfessionalData {
  passwordHash?: string;
  emailVerifiedAt?: Date | null;
  emailVerifyToken?: string | null;
  resetPasswordToken?: string | null;
  resetPasswordExpiresAt?: Date | null;
  failedLoginAttempts?: number;
  lockedUntil?: Date | null;
}

export interface IProfessionalRepository {
  findByEmail(email: string): Promise<ProfessionalRecord | null>;
  findById(id: string): Promise<ProfessionalRecord | null>;
  findByEmailVerifyToken(token: string): Promise<ProfessionalRecord | null>;
  findByResetPasswordToken(token: string): Promise<ProfessionalRecord | null>;
  create(data: CreateProfessionalData): Promise<ProfessionalRecord>;
  update(id: string, data: UpdateProfessionalData): Promise<ProfessionalRecord>;
}

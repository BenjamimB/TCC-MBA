import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PrismaPatientRepository } from '../infra/adapters/prisma-patient.repository';

@Module({
  providers: [
    {
      provide: PatientService,
      useFactory: (repo: PrismaPatientRepository) => new PatientService(repo),
      inject: [PrismaPatientRepository],
    },
  ],
  exports: [PatientService],
})
export class PatientModule {}

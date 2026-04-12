import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ConversationModule } from './conversation/conversation.module';
import { BookingModule } from './booking/booking.module';
import { PatientModule } from './patient/patient.module';
import { AuthModule } from './auth/auth.module';
import { BillingModule } from './billing/billing.module';
import { InfraModule } from './infra/infra.module';
import { DomainExceptionFilter } from './shared/domain-exception.filter';

@Module({
  imports: [
    InfraModule,
    HealthModule,
    ScheduleModule,
    ConversationModule,
    BookingModule,
    PatientModule,
    AuthModule,
    BillingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: DomainExceptionFilter },
  ],
})
export class AppModule {}

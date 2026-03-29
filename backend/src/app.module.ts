import { Module } from '@nestjs/common';
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
  providers: [AppService],
})
export class AppModule {}

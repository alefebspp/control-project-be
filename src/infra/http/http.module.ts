import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AdjustmentsControllerModule } from './controllers/adjustments/adjustments.module';
import { CollaboratorsControllerModule } from './controllers/collaborators/collaborators.module';
import { RegistriesControllerModule } from './controllers/registries/registries.module';
import { CompaniesControllerModule } from './controllers/companies/companies.module';
import { HourRecordControllerModule } from './controllers/hour-record/hour-record.module';

@Module({
  imports: [
    DatabaseModule,
    AdjustmentsControllerModule,
    CollaboratorsControllerModule,
    CompaniesControllerModule,
    RegistriesControllerModule,
    HourRecordControllerModule,
  ],
})
export class HttpModule {}

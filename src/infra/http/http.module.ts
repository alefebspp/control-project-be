import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AdjustmentsControllerModule } from './controllers/adjustments/adjustments.module';
import { CollaboratorsControllerModule } from './controllers/collaborators/collaborators.module';
import { RegistriesControllerModule } from './controllers/registries/registries.module';
import { CompaniesControllerModule } from './controllers/companies/companies.module';

@Module({
  imports: [
    DatabaseModule,
    AdjustmentsControllerModule,
    CollaboratorsControllerModule,
    CompaniesControllerModule,
    RegistriesControllerModule,
  ],
})
export class HttpModule {}

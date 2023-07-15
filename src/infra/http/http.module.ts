import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AdjustmentsControllerModule } from './controllers/adjustments/adjustments.module';
import { CollaboratorsControllerModule } from './controllers/collaborators/collaborators.module';
import { RegistriesControllerModule } from './controllers/registries/registries.module';

@Module({
  imports: [
    DatabaseModule,
    AdjustmentsControllerModule,
    CollaboratorsControllerModule,
    RegistriesControllerModule,
  ],
})
export class HttpModule {}

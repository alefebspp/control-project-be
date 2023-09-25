import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CalculateRegistriesHoursController } from './calculate-registries-hours-controller';
import { CreateRegistryController } from './create-registry-controller';
import { ListRegistriesController } from './list-registries-controller';
import { UpdateRegistryController } from './update-registry-controller';
import { CalculateRegistriesHours } from '@app/useCases/registry/calculate-registries-hours/calculate-registries-hours';
import { CreateRegistry } from '@app/useCases/registry/create-registry/create-registry';
import { ListRegistries } from '@app/useCases/registry/list-registries/list-registries';
import { UpdateRegistry } from '@app/useCases/registry/update-registry/update-registry';
import { CreateHourRecord } from '@app/useCases/hour-record/create-hour-record/create-hour-record';
import { UpdateHourRecord } from '@app/useCases/hour-record/update-hour-record/update-hour-record';
import { FindCollaborator } from '@app/useCases/collaborator/find-collaborator/find-collaborator';
import { UpdateCollaborator } from '@app/useCases/collaborator/update-collaborator/update-collaborator';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CalculateRegistriesHoursController,
    CreateRegistryController,
    ListRegistriesController,
    UpdateRegistryController,
  ],
  providers: [
    CalculateRegistriesHours,
    CreateRegistry,
    ListRegistries,
    UpdateRegistry,
    CreateHourRecord,
    UpdateHourRecord,
    FindCollaborator,
    UpdateCollaborator,
  ],
})
export class RegistriesControllerModule {}

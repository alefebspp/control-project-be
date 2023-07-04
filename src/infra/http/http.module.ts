import { Module } from '@nestjs/common';
import { CreateRegistryController } from './controllers/registries/create-registry-controller';
import { CreateRegistry } from '@app/useCases/registry/create-registry/create-registry';
import { DatabaseModule } from '../database/database.module';
import { CreateCollaboratorController } from './controllers/collaborators/create-collaborator-controller';
import { CreateCollaborator } from '@app/useCases/collaborator/create-collaborator/create-collaborator';
import { FindCollaboratorController } from './controllers/collaborators/find-collaborator-controller';
import { FindCollaborator } from '@app/useCases/collaborator/find-collaborator/find-collaborator';
import { ListRegistriesController } from './controllers/registries/list-registries-controller';
import { ListRegistries } from '@app/useCases/registry/list-registries/list-registries';
import { FindCollaboratorRegistryController } from './controllers/registries/find-collaborator-registries';
import { FindCollaboratorRegistries } from '@app/useCases/registry/find-collaborator-registry/find-collaborator-registries';
import { UpdateRegistry } from '@app/useCases/registry/update-registry/update-registry';
import { UpdateRegistryController } from './controllers/registries/update-registry-controller';
import { CreateAdjustmentController } from './controllers/adjustments/create-adjustment-controller';
import { CreateAdjustment } from '@app/useCases/request/create-adjustment/create-adjustment';
import { ListAdjustmentController } from './controllers/adjustments/list-adjustments-controller';
import { ListAdjustments } from '@app/useCases/request/list-adjustments/list-adjustments';
import { FindAdjustmentByRegistryId } from '@app/useCases/request/find-adjustment-by-registry-id/find-adjustment-by-registry-id';
import { FindAdjustmentByRegistryIdController } from './controllers/adjustments/find-adjustmet-by-registry-id-controller';
import { ValidateAdjustmentController } from './controllers/adjustments/validate-adjustment-controller';
import { ValidateAdjustment } from '@app/useCases/request/validate-adjustment/validate-adjustment';
import { FindAdjustmentController } from './controllers/adjustments/find-adjustment-controller';
import { FindAdjustment } from '@app/useCases/request/find-adjustment/find-adjustment';

@Module({
  imports: [DatabaseModule],
  controllers: [
    FindAdjustmentController,
    ValidateAdjustmentController,
    FindAdjustmentByRegistryIdController,
    ListAdjustmentController,
    CreateAdjustmentController,
    CreateRegistryController,
    ListRegistriesController,
    UpdateRegistryController,
    CreateCollaboratorController,
    FindCollaboratorController,
    FindCollaboratorRegistryController,
  ],
  providers: [
    FindAdjustment,
    ValidateAdjustment,
    FindAdjustmentByRegistryId,
    ListAdjustments,
    CreateAdjustment,
    CreateRegistry,
    ListRegistries,
    UpdateRegistry,
    CreateCollaborator,
    FindCollaborator,
    FindCollaboratorRegistries,
  ],
})
export class HttpModule {}

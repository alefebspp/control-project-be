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

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateRegistryController,
    ListRegistriesController,
    UpdateRegistryController,
    CreateCollaboratorController,
    FindCollaboratorController,
    FindCollaboratorRegistryController,
  ],
  providers: [
    CreateRegistry,
    ListRegistries,
    UpdateRegistry,
    CreateCollaborator,
    FindCollaborator,
    FindCollaboratorRegistries,
  ],
})
export class HttpModule {}

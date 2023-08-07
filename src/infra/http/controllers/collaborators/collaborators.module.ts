import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';

import { CreateCollaboratorController } from './create-collaborator-controller';
import { FindCollaboratorController } from './find-collaborator-controller';
import { FindCollaboratorRegistryController } from '../registries/find-collaborator-registries';
import { ChangeCollaboratorAvatarController } from './change-collaborator-avatar';
import { ListCollaboratorsController } from './list-collaborators-controller';
import { DeleteCollaboratorController } from './delete-collaborator-controller';
import { UpdateCollaboratorController } from './update-collaborator-controller';

import { CreateCollaborator } from '@app/useCases/collaborator/create-collaborator/create-collaborator';
import { FindCollaborator } from '@app/useCases/collaborator/find-collaborator/find-collaborator';
import { FindCollaboratorRegistries } from '@app/useCases/registry/find-collaborator-registry/find-collaborator-registries';
import { ChangeCollaboratorAvatar } from '@app/useCases/collaborator/change-collaborator-avatar/change-collaborator-avatar';
import { ListCollaborators } from '@app/useCases/collaborator/list-collaborators/list-collaborators';
import { DeleteCollaborator } from '@app/useCases/collaborator/delete-collaborator/delete-collaborator';
import { UpdateCollaborator } from '@app/useCases/collaborator/update-collaborator/update-collaborator';

import { CloudStorageService } from 'src/services/cloud-storage.service';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateCollaboratorController,
    FindCollaboratorController,
    FindCollaboratorRegistryController,
    ChangeCollaboratorAvatarController,
    ListCollaboratorsController,
    DeleteCollaboratorController,
    UpdateCollaboratorController,
  ],
  providers: [
    CreateCollaborator,
    FindCollaborator,
    FindCollaboratorRegistries,
    ChangeCollaboratorAvatar,
    CloudStorageService,
    ListCollaborators,
    DeleteCollaborator,
    UpdateCollaborator,
  ],
})
export class CollaboratorsControllerModule {}

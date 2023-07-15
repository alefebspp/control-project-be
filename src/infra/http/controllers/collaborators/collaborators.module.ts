import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateCollaboratorController } from './create-collaborator-controller';
import { FindCollaboratorController } from './find-collaborator-controller';
import { FindCollaboratorRegistryController } from '../registries/find-collaborator-registries';
import { CreateCollaborator } from '@app/useCases/collaborator/create-collaborator/create-collaborator';
import { FindCollaborator } from '@app/useCases/collaborator/find-collaborator/find-collaborator';
import { FindCollaboratorRegistries } from '@app/useCases/registry/find-collaborator-registry/find-collaborator-registries';
import { ChangeCollaboratorAvatarController } from './change-collaborator-avatar';
import { ChangeCollaboratorAvatar } from '@app/useCases/collaborator/change-collaborator-avatar/change-collaborator-avatar';
import { CloudStorageService } from 'src/services/cloud-storage.service';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateCollaboratorController,
    FindCollaboratorController,
    FindCollaboratorRegistryController,
    ChangeCollaboratorAvatarController,
  ],
  providers: [
    CreateCollaborator,
    FindCollaborator,
    FindCollaboratorRegistries,
    ChangeCollaboratorAvatar,
    CloudStorageService,
  ],
})
export class CollaboratorsControllerModule {}

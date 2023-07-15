import { Injectable } from '@nestjs/common';
import { CollaboratorsRepository } from '../../../repositories/collaborators-repository';
import { CloudStorageService } from 'src/services/cloud-storage.service';

@Injectable()
export class ChangeCollaboratorAvatar {
  constructor(
    private collaboratorsRepository: CollaboratorsRepository,
    private cloudStorageService: CloudStorageService,
  ) {}

  async execute(fileUrl: string, collaborator_id: string) {
    const collaborator = await this.collaboratorsRepository.find(
      collaborator_id,
    );
    if (collaborator.avatar != null) {
      const splitedCollaboratorAvatarString = collaborator.avatar.split('/');

      const collaboratorAvatarFileName =
        splitedCollaboratorAvatarString[
          splitedCollaboratorAvatarString.length - 1
        ];

      const avatarExists = await this.cloudStorageService.findFile(
        collaboratorAvatarFileName,
      );

      if (avatarExists) {
        await this.cloudStorageService.removeFile(collaboratorAvatarFileName);
      }
    }

    await this.collaboratorsRepository.changeAvatar(fileUrl, collaborator.id);
  }
}

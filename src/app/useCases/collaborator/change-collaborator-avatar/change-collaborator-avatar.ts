import { Injectable } from '@nestjs/common';
import { CollaboratorsRepository } from '../../../repositories/collaborators-repository';
import { CloudStorageService } from 'src/services/cloud-storage.service';

@Injectable()
export class ChangeCollaboratorAvatar {
  constructor(
    private collaboratorsRepository: CollaboratorsRepository,
    private cloudStorageService: CloudStorageService,
  ) {}

  async execute(file: Express.Multer.File, collaborator_id: string) {
    const collaborator = await this.collaboratorsRepository.find(
      collaborator_id,
    );

    if (collaborator.avatar != null) {
      const avatarExists = await this.cloudStorageService.findFile(
        collaborator.id,
      );
      if (avatarExists) {
        await this.cloudStorageService.removeFile(collaborator.id);
      }
    }
    const { publicUrl } = await this.cloudStorageService.uploadFile(
      file,
      collaborator.id,
    );

    await this.collaboratorsRepository.changeAvatar(publicUrl, collaborator.id);
  }
}

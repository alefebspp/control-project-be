import { Injectable, NotFoundException } from '@nestjs/common';
import { CollaboratorsRepository } from '../../../repositories/collaborators-repository';
import { UpdateCollaboratorDTO } from '@app/dtos/collaborator.dtos';

@Injectable()
export class UpdateCollaborator {
  constructor(private collaboratorsRepository: CollaboratorsRepository) {}

  async execute(data: UpdateCollaboratorDTO, collaboratorId: string) {
    const collaborator = await this.collaboratorsRepository.find(
      collaboratorId,
    );

    if (!collaborator) {
      throw new NotFoundException('Could not find collaborator', {
        cause: new Error(),
        description: 'Does not exists a collaborator with the informed id',
      });
    }

    const updatedCollaborator = await this.collaboratorsRepository.update(
      { ...data },
      collaborator.id,
    );

    return updatedCollaborator;
  }
}

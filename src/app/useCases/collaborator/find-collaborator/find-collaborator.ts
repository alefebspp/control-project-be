import { CollaboratorsRepository } from '@app/repositories/collaborators-repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindCollaborator {
  constructor(private collaboratorRepository: CollaboratorsRepository) {}

  async execute(collaboratorId: string) {
    const collaborator = await this.collaboratorRepository.find(collaboratorId);

    if (!collaborator) {
      throw new NotFoundException('Could not find collaborator', {
        cause: new Error(),
        description: 'Does not exists a collaborator with the informed id',
      });
    }

    return {
      collaborator,
    };
  }
}

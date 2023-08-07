import { CollaboratorsRepository } from '@app/repositories/collaborators-repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteCollaborator {
  constructor(private collaboratorRepository: CollaboratorsRepository) {}

  async execute(collaboratorId: string) {
    const collaborator = await this.collaboratorRepository.find(collaboratorId);

    if (!collaborator) {
      throw new NotFoundException('Could not find collaborator to delete', {
        cause: new Error(),
        description: 'Does not exists a collaborator with the informed id',
      });
    }

    await this.collaboratorRepository.delete(collaborator.id);

    return {
      message: `Colaborador ${collaborator.name} ${collaborator.surname} deletado com sucesso`,
    };
  }
}

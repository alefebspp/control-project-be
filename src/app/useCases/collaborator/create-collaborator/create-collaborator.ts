import { Injectable } from '@nestjs/common';
import { Collaborator } from '../../../entities/collaborator/collaborator';
import { CollaboratorsRepository } from '../../../repositories/collaborators-repository';
import { CreateCollaboratorDTO } from '@app/dtos/collaborator.dtos';

@Injectable()
export class CreateCollaborator {
  constructor(private collaboratorsRepository: CollaboratorsRepository) {}

  async execute(request: CreateCollaboratorDTO) {
    const collaborator = new Collaborator({
      ...request,
    });

    await this.collaboratorsRepository.create(collaborator);

    return {
      collaborator,
    };
  }
}

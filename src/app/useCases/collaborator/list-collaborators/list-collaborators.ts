import { CollaboratorsRepository } from '@app/repositories/collaborators-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListCollaborators {
  constructor(private collaboratorsRepository: CollaboratorsRepository) {}

  async execute() {
    const collaborators = await this.collaboratorsRepository.list();

    collaborators.map((collaborator) => {
      delete collaborator.password;
    });

    return collaborators;
  }
}

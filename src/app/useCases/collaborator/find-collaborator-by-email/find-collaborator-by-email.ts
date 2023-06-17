import { CollaboratorsRepository } from '@app/repositories/collaborators-repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindCollaboratorByEmail {
  constructor(private collaboratorsRepository: CollaboratorsRepository) {}

  async execute(email: string) {
    const collaborator = await this.collaboratorsRepository.findByEmail(email);

    return collaborator;
  }
}

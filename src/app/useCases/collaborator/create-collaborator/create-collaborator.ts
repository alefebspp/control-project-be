import { Injectable } from '@nestjs/common';
import { Collaborator } from '../../../entities/collaborator/collaborator';
import { CollaboratorsRepository } from '../../../repositories/collaborators-repository';
import { CreateCollaboratorDTO } from '@app/dtos/collaborator.dtos';

@Injectable()
export class CreateCollaborator {
  constructor(private collaboratorsRepository: CollaboratorsRepository) {}

  async execute(request: CreateCollaboratorDTO) {
    const {
      name,
      surname,
      shift_start,
      shift_end,
      email,
      password,
      interval_start,
      interval_end,
      admin,
      company_id,
      manager,
    } = request;

    const collaborator = new Collaborator({
      name,
      surname,
      shift_start,
      shift_end,
      email,
      password,
      interval_end,
      interval_start,
      admin,
      company_id,
      manager,
    });

    await this.collaboratorsRepository.create(collaborator);

    return {
      collaborator,
    };
  }
}

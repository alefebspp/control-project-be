import { Injectable } from '@nestjs/common';
import { Collaborator } from '../../../entities/collaborator/collaborator';
import { CollaboratorsRepository } from '../../../repositories/collaborators-repository';

interface CreateCollaboratorRequest {
  name: string;
  surname: string;
  shift_start: Date;
  shift_end: Date;
  email: string;
  password: string;
}

@Injectable()
export class CreateCollaborator {
  constructor(private collaboratorsRepository: CollaboratorsRepository) {}

  async execute(request: CreateCollaboratorRequest) {
    const { name, surname, shift_start, shift_end, email, password } = request;

    const collaborator = new Collaborator({
      name,
      surname,
      shift_start,
      shift_end,
      email,
      password,
    });

    await this.collaboratorsRepository.create(collaborator);

    return {
      collaborator,
    };
  }
}

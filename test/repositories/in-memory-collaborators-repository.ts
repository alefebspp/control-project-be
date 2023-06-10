import { Collaborator } from '@app/entities/collaborator/collaborator';
import { CollaboratorsRepository } from '@app/repositories/collaborators-repository';

export class InMemoryCollaboratorsRepository
  implements CollaboratorsRepository
{
  public collaborators: Collaborator[] = [];

  async find(collaboratorId: string): Promise<Collaborator> {
    const collaborator = this.collaborators.find(
      (collaborator) => collaborator.id == collaboratorId,
    );

    return collaborator;
  }

  async create(collaborator: Collaborator): Promise<void> {
    this.collaborators.push(collaborator);
  }
}

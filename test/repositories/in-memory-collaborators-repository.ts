import { Collaborator } from '@app/entities/collaborator/collaborator';
import {
  CollaboratorsRepository,
  CollaboratorResponse,
} from '@app/repositories/collaborators-repository';

export class InMemoryCollaboratorsRepository
  implements CollaboratorsRepository
{
  changeAvatar(fileUrl: string, collaborator_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<CollaboratorResponse> {
    throw new Error('Method not implemented.');
  }
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

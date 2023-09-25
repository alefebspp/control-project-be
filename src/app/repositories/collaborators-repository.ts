import { Collaborator } from '../entities/collaborator/collaborator';
import { UpdateCollaboratorDTO } from '@app/dtos/collaborator.dtos';

export interface CollaboratorResponse
  extends Omit<Collaborator, '_id' | 'props' | 'shiftStart' | 'shiftEnd'> {}

export abstract class CollaboratorsRepository {
  abstract create(collaborator: Collaborator): Promise<void>;

  abstract find(collaboratorId: string): Promise<CollaboratorResponse>;

  abstract update(
    data: UpdateCollaboratorDTO,
    collaboratorId: string,
  ): Promise<CollaboratorResponse>;

  abstract findByEmail(email: string): Promise<CollaboratorResponse>;

  abstract list(companyId: string): Promise<CollaboratorResponse[]>;

  abstract delete(collaboratorId: string): Promise<void>;

  abstract changeAvatar(
    fileUrl: string,
    collaborator_id: string,
  ): Promise<void>;
}

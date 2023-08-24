import { Collaborator } from '../entities/collaborator/collaborator';
import { UpdateCollaboratorDTO } from '@app/dtos/collaborator.dtos';

export interface CollaboratorInfo
  extends Omit<Collaborator, '_id' | 'props' | 'shiftStart' | 'shiftEnd'> {}

export abstract class CollaboratorsRepository {
  abstract create(collaborator: Collaborator): Promise<void>;

  abstract find(collaboratorId: string): Promise<CollaboratorInfo>;

  abstract update(
    data: UpdateCollaboratorDTO,
    collaboratorId: string,
  ): Promise<CollaboratorInfo>;

  abstract findByEmail(email: string): Promise<CollaboratorInfo>;

  abstract list(companyId: string): Promise<CollaboratorInfo[]>;

  abstract delete(collaboratorId: string): Promise<void>;

  abstract changeAvatar(
    fileUrl: string,
    collaborator_id: string,
  ): Promise<void>;
}

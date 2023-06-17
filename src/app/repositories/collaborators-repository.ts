import { Collaborator } from '../entities/collaborator/collaborator';

export interface CollaboratorInfo
  extends Omit<Collaborator, '_id' | 'props' | 'shiftStart' | 'shiftEnd'> {}

export abstract class CollaboratorsRepository {
  abstract create(collaborator: Collaborator): Promise<void>;

  abstract find(collaboratorId: string): Promise<CollaboratorInfo>;

  abstract findByEmail(email: string): Promise<CollaboratorInfo>;
}

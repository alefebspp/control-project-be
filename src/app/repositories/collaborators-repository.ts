import { Collaborator } from '../entities/collaborator/collaborator';

export interface FindCollaboratorResponse
  extends Omit<Collaborator, '_id' | 'props' | 'shiftStart' | 'shiftEnd'> {}

export abstract class CollaboratorsRepository {
  abstract create(collaborator: Collaborator): Promise<void>;

  abstract find(collaboratorId: string): Promise<FindCollaboratorResponse>;
}

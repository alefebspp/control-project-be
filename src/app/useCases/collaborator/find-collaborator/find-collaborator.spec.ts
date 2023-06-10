import { InMemoryCollaboratorsRepository } from '@test/repositories/in-memory-collaborators-repository';
import { FindCollaborator } from './find-collaborator';
import { CreateCollaborator } from '../create-collaborator/create-collaborator';
import { NotFoundException } from '@nestjs/common';

describe('Find collaborator with a given id', () => {
  let collaboratorsRepository: InMemoryCollaboratorsRepository;
  let createCollaborator: CreateCollaborator;
  let findCollaborator: FindCollaborator;

  beforeEach(() => {
    collaboratorsRepository = new InMemoryCollaboratorsRepository();
    createCollaborator = new CreateCollaborator(collaboratorsRepository);
    findCollaborator = new FindCollaborator(collaboratorsRepository);
  });

  it('should be able to find a collaborator', async () => {
    const { collaborator } = await createCollaborator.execute({
      name: 'Alefe',
      surname: 'Bispo',
      shift_start: new Date('05/16/2023 5:00:00'),
      shift_end: new Date('05/16/2023 15:00:00'),
      email: 'test@hotmail.com',
      password: '123',
    });

    const { collaborator: findedCollaborator } = await findCollaborator.execute(
      collaborator.id,
    );

    expect(collaborator).toEqual(findedCollaborator);
  });

  it('should not be able to find collaborator if the given id doenst exists', async () => {
    expect(async () => {
      const { collaborator } = await findCollaborator.execute(
        'collaborator-id',
      );
    }).rejects.toBeInstanceOf(NotFoundException);
  });
});

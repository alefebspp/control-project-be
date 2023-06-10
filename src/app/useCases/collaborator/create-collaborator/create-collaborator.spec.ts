import { InMemoryCollaboratorsRepository } from '@test/repositories/in-memory-collaborators-repository';
import { CreateCollaborator } from './create-collaborator';

describe('Create collaborator', () => {
  it('should be able to create a collaborator', async () => {
    const collaboratorsRepository = new InMemoryCollaboratorsRepository();
    const createCollaborator = new CreateCollaborator(collaboratorsRepository);

    const { collaborator } = await createCollaborator.execute({
      name: 'Alefe',
      surname: 'Bispo',
      shift_start: new Date('05/16/2023 5:00:00'),
      shift_end: new Date('05/16/2023 15:00:00'),
      email: 'test@hotmail.com',
      password: '123',
    });

    expect(collaboratorsRepository.collaborators[0]).toEqual(collaborator);
  });
});

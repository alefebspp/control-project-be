import { InMemoryRegistriesRepository } from '@test/repositories/in-memory-registries-repository';
import { CreateRegistry } from './create-registry';

describe('Create registry use case', () => {
  it('it should be able to create a registry', async () => {
    const registriesRepository = new InMemoryRegistriesRepository();
    const createRegistry = new CreateRegistry(registriesRepository);

    const { registry } = await createRegistry.execute({
      date: new Date('05/15/2023'),
      start: '5:00:00',
      interval_start: '9:00:00',
      interval_end: '10:00:00',
      end: '16:00:00',
      collaborator_id: 'colaborator-id',
      company_id: 'collaborator-company',
    });

    expect(registriesRepository.registries[0]).toEqual(registry);
  });
});

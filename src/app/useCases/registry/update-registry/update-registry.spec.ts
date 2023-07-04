import { InMemoryRegistriesRepository } from '@test/repositories/in-memory-registries-repository';
import { UpdateRegistry } from './update-registry';
import { CreateRegistry } from '../create-registry/create-registry';
import { InMemoryRequestsRepository } from '@test/repositories/in-memory-requests-repository';
import { CreateAdjustment } from '@app/useCases/request/create-adjustment/create-adjustment';
import { BadRequestException } from '@nestjs/common';

describe('Update a registry', () => {
  let registriesRepository: InMemoryRegistriesRepository;
  let requestsRepository: InMemoryRequestsRepository;
  let createAdjustment: CreateAdjustment;
  let updateRegistry: UpdateRegistry;
  let createRegistry: CreateRegistry;

  beforeEach(() => {
    registriesRepository = new InMemoryRegistriesRepository();
    requestsRepository = new InMemoryRequestsRepository();
    createAdjustment = new CreateAdjustment(requestsRepository);
    updateRegistry = new UpdateRegistry(registriesRepository);
    createRegistry = new CreateRegistry(registriesRepository);
  });

  it('Should be able to update a registry', async () => {
    const { registry } = await createRegistry.execute({
      date: new Date('6/24/23'),
      start: '5:00:00',
      interval_start: '9:00:00',
      interval_end: '10:00:00',
      end: '16:00:00',
      collaborator_id: 'colaborator-id',
    });

    const updatedRegistry = await updateRegistry.execute({
      registry_id: registry.id,
      data: {
        start: '6:00:00',
        end: '17:00:00',
      },
    });

    expect(registry.id).toEqual(updatedRegistry.id);
  });

  it('Should make a request if registry date its different than current date', async () => {
    try {
      const { registry } = await createRegistry.execute({
        date: new Date('6/23/23'),
        start: '5:00:00',
        interval_start: '9:00:00',
        interval_end: '10:00:00',
        end: '16:00:00',
        collaborator_id: 'colaborator-id',
      });

      const updatedRegistry = await registriesRepository.update(registry.id, {
        start: '6:00:00',
      });
    } catch (error) {
      expect(error).rejects.toBeInstanceOf(BadRequestException);
    }
  });
});

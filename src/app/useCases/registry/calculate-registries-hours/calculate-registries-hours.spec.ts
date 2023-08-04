import { CreateCollaborator } from '@app/useCases/collaborator/create-collaborator/create-collaborator';
import { CreateRegistry } from '../create-registry/create-registry';
import { InMemoryCollaboratorsRepository } from '@test/repositories/in-memory-collaborators-repository';
import { InMemoryRegistriesRepository } from '@test/repositories/in-memory-registries-repository';
import {
  subtractRegistries,
  sumRegistries,
} from 'src/shared/utils/registryOperations';
import { FindCollaboratorRegistries } from '../find-collaborator-registry/find-collaborator-registries';

describe('Calculate registries hours', () => {
  let createCollaborator: CreateCollaborator;
  let createRegistry: CreateRegistry;
  let findCollaboratorRegistries: FindCollaboratorRegistries;
  let collaboratorsRepository = new InMemoryCollaboratorsRepository();
  let registriesRepository = new InMemoryRegistriesRepository();

  beforeEach(() => {
    createCollaborator = new CreateCollaborator(collaboratorsRepository);
    createRegistry = new CreateRegistry(registriesRepository);
    findCollaboratorRegistries = new FindCollaboratorRegistries(
      registriesRepository,
    );
  });

  it('Should be able to calculate aditional and pending collaborator hours', async () => {
    const { collaborator } = await createCollaborator.execute({
      name: 'Alefe',
      surname: 'Bispo',
      shift_start: '08:00',
      shift_end: '18:00',
      interval_start: '12:00',
      interval_end: '13:00',
      email: 'test@hotmail.com',
      password: '123',
    });

    let aditionalTotalHours: string = '00:00';
    let pendingTotalHours: string = '00:00';

    const collaboratorDayTotalTime = subtractRegistries(
      collaborator.shift_end,
      collaborator.shift_start,
    );

    await createRegistry.execute({
      date: new Date('06/15/2023'),
      start: '08:00',
      interval_start: '12:00',
      interval_end: '13:00',
      end: '19:00',
      collaborator_id: collaborator.id,
    });

    await createRegistry.execute({
      date: new Date('06/15/2023'),
      start: '08:00',
      interval_start: '12:00',
      interval_end: '13:00',
      end: '17:30',
      collaborator_id: collaborator.id,
    });

    await createRegistry.execute({
      date: new Date('06/15/2023'),
      start: '08:00',
      interval_start: '12:00',
      interval_end: '13:00',
      end: '17:00',
      collaborator_id: collaborator.id,
    });

    const registries = await findCollaboratorRegistries.execute(
      collaborator.id,
      undefined,
      '2023-06',
    );

    registries.forEach((registry) => {
      const { end, start } = registry;

      if (start != null && end != null) {
        const registryTotalTime = subtractRegistries(end, start);

        const registryHours = parseInt(registryTotalTime.split(':')[0]);

        const collaboratorTotalHours = parseInt(
          collaboratorDayTotalTime.split(':')[0],
        );

        if (registryHours > collaboratorTotalHours) {
          aditionalTotalHours = sumRegistries(
            aditionalTotalHours,
            subtractRegistries(registryTotalTime, collaboratorDayTotalTime),
          );
        }
        if (registryHours < collaboratorTotalHours) {
          pendingTotalHours = sumRegistries(
            pendingTotalHours,
            subtractRegistries(collaboratorDayTotalTime, registryTotalTime),
          );
        }
        if (registryHours == collaboratorTotalHours) {
          const registryMinutes = parseInt(registryTotalTime.split(':')[1]);
          const collaboratorTotalMinutes = parseInt(
            collaboratorDayTotalTime.split(':')[1],
          );
          if (registryMinutes > collaboratorTotalMinutes) {
            aditionalTotalHours = sumRegistries(
              aditionalTotalHours,
              subtractRegistries(registryTotalTime, collaboratorDayTotalTime),
            );
          }
        }
      }
    });

    expect(
      aditionalTotalHours == '01:00' && pendingTotalHours == '01:30',
    ).toEqual(true);
  });
});

import { Collaborator } from '../collaborator/collaborator';
import { Registry } from './registry';

describe('Create registry', () => {
  it('should be able to create a registry', () => {
    const registry = new Registry({
      start: new Date('05/15/2023 5:00:00'),
      interval_start: new Date('05/15/2023 9:00:00'),
      interval_end: new Date('05/15/2023 10:00:00'),
      end: new Date('05/15/2023 15:00:00'),
      collaboratorId: 'collaborator-id',
    });

    expect(registry).toBeTruthy();
  });

  it('should be able to get the hours and minutes difference between a registry and a collaborator hours', () => {
    const collaborator = new Collaborator({
      name: 'Alefe',
      surname: 'Bispo',
      shift_end: new Date('05/15/2023 15:00:00'),
      shift_start: new Date('05/15/2023 5:00:00'),
      email: 'test@hotmail.com',
      password: '123',
    });

    const registry = new Registry({
      start: new Date('05/15/2023 5:00:00'),
      interval_start: new Date('05/15/2023 9:00:00'),
      interval_end: new Date('05/15/2023 10:00:00'),
      end: new Date('05/15/2023 16:00:00'),
      collaboratorId: collaborator.id,
    });

    const hoursAndMinutesDifference =
      registry.getDayHoursAndMinutes(collaborator);

    expect(hoursAndMinutesDifference.hours).toBe(1);
  });
});

import { hhMmToSeconds } from './registryOperations';
import { HourRecord } from '@app/entities/hour-record/hour-record';
import { CollaboratorResponse } from '@app/repositories/collaborators-repository';
import { RegistryResponse } from '@app/repositories/registries-repository';

export function generateHourRecord(
  collaborator: CollaboratorResponse,
  new_hour: string,
  registry_type: string,
  hour_record_exists: boolean,
) {
  const baseHourSeconds = hhMmToSeconds(collaborator[`shift_${registry_type}`]);
  const newHourSeconds = hhMmToSeconds(new_hour);

  const ordinaryHours = baseHourSeconds == newHourSeconds;

  if (ordinaryHours && !hour_record_exists) {
    return;
  }

  if (ordinaryHours && hour_record_exists) {
    let hourRecord = new HourRecord({
      collaborator_id: collaborator.id,
      seconds: 0,
      type: 'ADDITIONAL',
      registry_type,
    });
    return hourRecord;
  }

  const shiftStartRegistry = registry_type == 'start';
  const shiftEndRegistry = registry_type == 'end';

  const pendingHours = shiftStartRegistry
    ? newHourSeconds > baseHourSeconds
    : baseHourSeconds > newHourSeconds;

  let seconds: number;
  if (shiftStartRegistry) {
    seconds = pendingHours
      ? newHourSeconds - baseHourSeconds
      : baseHourSeconds - newHourSeconds;
  }

  if (shiftEndRegistry) {
    seconds = pendingHours
      ? baseHourSeconds - newHourSeconds
      : newHourSeconds - baseHourSeconds;
  }

  let hourRecord = new HourRecord({
    collaborator_id: collaborator.id,
    seconds,
    type: pendingHours ? 'PENDING' : 'ADDITIONAL',
    registry_type,
  });

  return hourRecord;
}

export function generateIntervalHourRecord(
  collaborator: CollaboratorResponse,
  interval_end: string,
  registry: RegistryResponse,
) {
  if (registry.interval_start == null) {
    return;
  }

  const collaboratorIntervalStartSeconds = hhMmToSeconds(
    collaborator['interval_start'],
  );
  const collaboratorIntervalEndSeconds = hhMmToSeconds(
    collaborator['interval_end'],
  );

  const registryIntervalStartSeconds = hhMmToSeconds(registry.interval_start);
  const registryIntervalEndSeconds = hhMmToSeconds(interval_end);

  const collaboratorIntervalSeconds =
    collaboratorIntervalEndSeconds - collaboratorIntervalStartSeconds;

  const registryIntervalSeconds =
    registryIntervalEndSeconds - registryIntervalStartSeconds;

  const ordinaryHours = collaboratorIntervalSeconds == registryIntervalSeconds;
  const pendingHours = registryIntervalSeconds > collaboratorIntervalSeconds;

  if (ordinaryHours) {
    return;
  }

  let seconds: number;

  seconds = pendingHours
    ? registryIntervalSeconds - collaboratorIntervalSeconds
    : collaboratorIntervalSeconds - registryIntervalSeconds;

  let hourRecord = new HourRecord({
    collaborator_id: collaborator.id,
    seconds,
    type: pendingHours ? 'PENDING' : 'ADDITIONAL',
    registry_type: 'interval_end',
  });

  return hourRecord;
}

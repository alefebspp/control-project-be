import { HourRecord } from '@app/entities/hour-record/hour-record';
import { CollaboratorsRepository } from '@app/repositories/collaborators-repository';
import { HourRecordRepository } from '@app/repositories/hour-record-repository';
import { RegistriesRepository } from '@app/repositories/registries-repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  generateHourRecord,
  generateIntervalHourRecord,
} from 'src/shared/utils/hour-record-functions';
import { UpdateHourRecord } from '../update-hour-record/update-hour-record';

interface NewRegistryData {
  registry_type: string;
  new_registry: string;
}

@Injectable()
export class CreateHourRecord {
  constructor(
    private hourRecordRepository: HourRecordRepository,
    private collaboratorsRepository: CollaboratorsRepository,
    private registriesRepository: RegistriesRepository,
    private updateHourRecord: UpdateHourRecord,
  ) {}

  async execute(
    collaborator_id: string,
    registry_id: string,
    data: NewRegistryData,
  ) {
    const collaborator = await this.collaboratorsRepository.find(
      collaborator_id,
    );

    const registry = await this.registriesRepository.find(registry_id);

    if (!collaborator || !registry) {
      throw new NotFoundException('Could not create hour record', {
        cause: new Error(),
        description:
          'Does not exists a collaborator or registry with the informed id',
      });
    }

    const { registry_type, new_registry } = data;

    const foundHourRecord = await this.hourRecordRepository.findByRegistryId(
      registry.id,
      registry_type,
    );
    const hourRecordAlreadyExists = foundHourRecord != undefined;

    let hourRecord: HourRecord | undefined;

    if (!registry_type.startsWith('interval')) {
      hourRecord = generateHourRecord(
        collaborator,
        new_registry,
        registry_type,
        hourRecordAlreadyExists,
      );
    }

    if (registry_type == 'interval_end') {
      hourRecord = generateIntervalHourRecord(
        collaborator,
        new_registry,
        registry,
      );
    }

    if (hourRecord) {
      if (hourRecordAlreadyExists) {
        await this.updateHourRecord.execute(
          foundHourRecord.id,
          collaborator.id,
          { type: hourRecord.type, seconds: hourRecord.seconds },
        );
        return;
      }

      const additionalHourRecord = hourRecord.type == 'ADDITIONAL';
      hourRecord.registry_id = registry.id;
      await this.hourRecordRepository.create(hourRecord);
      await this.collaboratorsRepository.update(
        {
          hours_balance: additionalHourRecord
            ? collaborator.hours_balance + hourRecord.seconds
            : collaborator.hours_balance - hourRecord.seconds,
        },
        collaborator.id,
      );
    }
  }
}

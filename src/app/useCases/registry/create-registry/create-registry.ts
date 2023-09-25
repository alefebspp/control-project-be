import { Injectable, BadRequestException } from '@nestjs/common';
import { Registry } from '../../../entities/registry/registry';
import { RegistriesRepository } from '../../../repositories/registries-repository';
import { CreateHourRecord } from '@app/useCases/hour-record/create-hour-record/create-hour-record';

interface CreateRegistryRequest {
  registry_type: string;
  date: Date;
  start?: string;
  start_location?: string;
  end?: string;
  end_location?: string;
  interval_start?: string;
  interval_start_location?: string;
  interval_end?: string;
  interval_end_location?: string;
  collaborator_id: string;
  company_id: string;
}

@Injectable()
export class CreateRegistry {
  constructor(
    private registriesRepository: RegistriesRepository,
    private createHourRecord: CreateHourRecord,
  ) {}
  async execute(request: CreateRegistryRequest) {
    const { date, registry_type, collaborator_id, start } = request;

    if (registry_type != 'start') {
      throw new BadRequestException(
        'Um novo registro deve começar pela entrada',
        {
          cause: new Error(),
          description: 'Para criar um novo registro, comece pela entrada',
        },
      );
    }

    const newDate = new Date(date);
    newDate.setUTCHours(0, 0, 0, 0);

    const registry = new Registry({
      ...request,
      date: newDate,
    });

    const createdRegistry = await this.registriesRepository.create(registry);

    await this.createHourRecord.execute(collaborator_id, createdRegistry.id, {
      registry_type: 'start',
      new_registry: start,
    });

    return {
      registry: createdRegistry,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { Registry } from '../../../entities/registry/registry';
import { RegistriesRepository } from '../../../repositories/registries-repository';

interface CreateRegistryRequest {
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
  constructor(private registriesRepository: RegistriesRepository) {}
  async execute(request: CreateRegistryRequest) {
    const {
      start,
      start_location,
      end,
      end_location,
      interval_end,
      interval_end_location,
      interval_start,
      interval_start_location,
      collaborator_id,
      date,
      company_id,
    } = request;

    const newDate = new Date(date);
    newDate.setUTCHours(0, 0, 0, 0);

    const registry = new Registry({
      date: newDate,
      start,
      start_location,
      end,
      end_location,
      interval_end,
      interval_end_location,
      interval_start,
      interval_start_location,
      collaborator_id,
      company_id,
    });

    await this.registriesRepository.create(registry);

    return {
      registry,
    };
  }
}

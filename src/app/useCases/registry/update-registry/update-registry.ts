import { RegistriesRepository } from '@app/repositories/registries-repository';
import { Injectable } from '@nestjs/common';

interface UpdateRegistryProps {
  registry_id: string;
  data: {
    start?: string;
    start_location?: string;
    end?: string;
    end_location?: string;
    interval_start?: string;
    interval_start_location?: string;
    interval_end?: string;
    interval_end_location?: string;
  };
}

@Injectable()
export class UpdateRegistry {
  constructor(private registriesRepository: RegistriesRepository) {}

  async execute({ registry_id, data }: UpdateRegistryProps) {
    const registry = await this.registriesRepository.update(registry_id, data);

    return registry;
  }
}

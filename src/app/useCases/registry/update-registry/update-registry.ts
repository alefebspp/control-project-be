import { RegistriesRepository } from '@app/repositories/registries-repository';
import { CreateHourRecord } from '@app/useCases/hour-record/create-hour-record/create-hour-record';
import { Injectable, NotFoundException } from '@nestjs/common';

interface UpdateRegistryProps {
  registry_id: string;
  registry_type: string;
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
  constructor(
    private registriesRepository: RegistriesRepository,
    private createHourRecord: CreateHourRecord,
  ) {}

  async execute({ registry_id, data, registry_type }: UpdateRegistryProps) {
    const registry = await this.registriesRepository.find(registry_id);

    if (!registry) {
      throw new NotFoundException('Could not find registry', {
        cause: new Error(),
        description: 'Does not exists a registry with the informed id',
      });
    }
    const { collaborator_id } = registry;

    await this.createHourRecord.execute(collaborator_id, registry.id, {
      registry_type,
      new_registry: data[registry_type],
    });

    const updatedRegistry = await this.registriesRepository.update(
      registry.id,
      data,
    );

    return updatedRegistry;
  }
}

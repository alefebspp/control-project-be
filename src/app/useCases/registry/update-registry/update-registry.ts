import { RegistriesRepository } from '@app/repositories/registries-repository';
import { Injectable, NotFoundException } from '@nestjs/common';

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
    const registry = await this.registriesRepository.find(registry_id);

    if (!registry) {
      throw new NotFoundException('Could not find registry', {
        cause: new Error(),
        description: 'Does not exists a registry with the informed id',
      });
    }

    //TODO: implement a way of adjustments dont pass through this verification
    // const currentDateEqualsRegistryDate = checkIfCurrentDateEqualsRegistryDate(
    //   registry.date,
    // );

    // if (!currentDateEqualsRegistryDate) {
    //   throw new BadRequestException('Cannot update registry', {
    //     cause: new Error(),
    //     description:
    //       'Current date is different than registry date.Make a request',
    //   });
    // }

    const updatedRegistry = await this.registriesRepository.update(
      registry_id,
      data,
    );

    return updatedRegistry;
  }
}

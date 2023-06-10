import { RegistriesRepository } from '@app/repositories/registries-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListRegistries {
  constructor(private registriesRepository: RegistriesRepository) {}

  async execute() {
    const registries = await this.registriesRepository.list();

    return {
      registries,
    };
  }
}

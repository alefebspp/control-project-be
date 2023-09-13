import {
  RegistriesRepository,
  ListRegistriesParams,
} from '@app/repositories/registries-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListRegistries {
  constructor(private registriesRepository: RegistriesRepository) {}

  async execute(params: ListRegistriesParams) {
    const response = await this.registriesRepository.list(params);

    return {
      ...response,
    };
  }
}

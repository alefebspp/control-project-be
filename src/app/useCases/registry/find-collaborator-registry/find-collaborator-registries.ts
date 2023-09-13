import { RegistriesRepository } from '@app/repositories/registries-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindCollaboratorRegistries {
  constructor(private registriesRepository: RegistriesRepository) {}

  async execute(
    collaborator_id: string,
    date: string | undefined,
    period: string | undefined,
  ) {
    const registries =
      await this.registriesRepository.findCollaboratorRegistries(
        collaborator_id,
        date,
        period,
      );

    return registries;
  }
}

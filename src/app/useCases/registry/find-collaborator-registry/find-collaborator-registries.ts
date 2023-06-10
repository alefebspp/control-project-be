import { RegistriesRepository } from '@app/repositories/registries-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindCollaboratorRegistries {
  constructor(private registriesRepository: RegistriesRepository) {}

  async execute(collaboratorId: string, date: string | undefined) {
    const registries =
      await this.registriesRepository.findCollaboratorRegistries(
        collaboratorId,
        date,
      );

    return registries;
  }
}

import { RegistriesRepository } from '@app/repositories/registries-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindRegistryByDay {
  constructor(private registriesRepository: RegistriesRepository) {}
  async execute(collaboratorId: string, day: string) {}
}

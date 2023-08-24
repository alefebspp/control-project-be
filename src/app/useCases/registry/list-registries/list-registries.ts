import { RegistriesRepository } from '@app/repositories/registries-repository';
import { FindCompany } from '@app/useCases/company/find-company/find-company';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListRegistries {
  constructor(private registriesRepository: RegistriesRepository) {}

  async execute(companyId: string) {
    const registries = await this.registriesRepository.list(companyId);

    return {
      registries,
    };
  }
}

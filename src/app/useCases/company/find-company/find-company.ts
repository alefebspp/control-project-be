import { CompaniesRepository } from '@app/repositories/companies-repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindCompany {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute(companyId: string) {
    const company = await this.companiesRepository.find(companyId);

    if (!company) {
      throw new NotFoundException('Could not find company', {
        cause: new Error(),
        description: 'Does not exists a company with the informed id',
      });
    }

    return {
      company,
    };
  }
}

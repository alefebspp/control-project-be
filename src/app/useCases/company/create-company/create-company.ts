import { Injectable } from '@nestjs/common';
import { Company } from '@app/entities/company/company';
import { CompaniesRepository } from '@app/repositories/companies-repository';
import { CreateCompanyDTO } from '@app/dtos/company.dtos';

@Injectable()
export class CreateCompany {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute(request: CreateCompanyDTO) {
    const { name, email, logo } = request;

    const company = new Company({
      name,
      email,
      logo,
    });

    const newCompany = await this.companiesRepository.create(company);

    return {
      newCompany,
    };
  }
}

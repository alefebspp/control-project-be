import { Injectable } from '@nestjs/common';
import { CompaniesRepository } from '@app/repositories/companies-repository';
import { UpdateCompanyDTO } from '@app/dtos/company.dtos';
import { FindCompany } from '../find-company/find-company';

@Injectable()
export class UpdateCompany {
  constructor(
    private companiesRepository: CompaniesRepository,
    private findCompany: FindCompany,
  ) {}

  async execute(data: UpdateCompanyDTO, companyId: string) {
    const { company } = await this.findCompany.execute(companyId);

    const updatedCompany = await this.companiesRepository.update(
      data,
      company.id,
    );

    return {
      updatedCompany,
    };
  }
}

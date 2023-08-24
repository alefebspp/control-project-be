import { Company } from '@app/entities/company/company';
import { UpdateCompanyDTO } from '@app/dtos/company.dtos';

export interface CompanyInfo extends Omit<Company, '_id' | 'props'> {}

export abstract class CompaniesRepository {
  abstract create(company: Company): Promise<CompanyInfo>;

  abstract update(
    data: UpdateCompanyDTO,
    companyId: string,
  ): Promise<CompanyInfo>;

  abstract find(companyId: string): Promise<CompanyInfo>;
}

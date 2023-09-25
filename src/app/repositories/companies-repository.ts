import { Company } from '@app/entities/company/company';
import { UpdateCompanyDTO } from '@app/dtos/company.dtos';

export interface CompanyResponse extends Omit<Company, '_id' | 'props'> {}

export abstract class CompaniesRepository {
  abstract create(company: Company): Promise<CompanyResponse>;

  abstract update(
    data: UpdateCompanyDTO,
    companyId: string,
  ): Promise<CompanyResponse>;

  abstract find(companyId: string): Promise<CompanyResponse>;
}

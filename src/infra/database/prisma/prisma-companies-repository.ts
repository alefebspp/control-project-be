import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Company } from '@app/entities/company/company';
import {
  CompaniesRepository,
  CompanyResponse,
} from '@app/repositories/companies-repository';
import { UpdateCompanyDTO } from '@app/dtos/company.dtos';

@Injectable()
export class PrismaCompaniesRepository implements CompaniesRepository {
  constructor(private prismaService: PrismaService) {}

  async update(
    data: UpdateCompanyDTO,
    companyId: string,
  ): Promise<CompanyResponse> {
    const updatedCompany = await this.prismaService.company.update({
      where: {
        id: companyId,
      },
      data: { ...data },
    });

    return updatedCompany;
  }

  async find(companyId: string): Promise<CompanyResponse> {
    const company = await this.prismaService.company.findUnique({
      where: {
        id: companyId,
      },
    });

    return company;
  }

  async create(company: Company): Promise<CompanyResponse> {
    const newCompany = await this.prismaService.company.create({
      data: {
        id: company.id,
        name: company.name,
        email: company.email,
        logo: company.logo,
      },
    });

    return newCompany;
  }
}

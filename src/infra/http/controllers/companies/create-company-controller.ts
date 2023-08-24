import { Controller, Post, Body } from '@nestjs/common';
import { CreateCompany } from '@app/useCases/company/create-company/create-company';
import { CreateCompanyDTO } from '../../dtos/companies/create-company.dto';

@Controller('company')
export class CreateCompanyController {
  constructor(private createCompany: CreateCompany) {}

  @Post('create')
  async create(@Body() body: CreateCompanyDTO) {
    const { name, email, logo } = body;

    const { newCompany } = await this.createCompany.execute({
      name,
      email,
      logo,
    });

    return newCompany;
  }
}

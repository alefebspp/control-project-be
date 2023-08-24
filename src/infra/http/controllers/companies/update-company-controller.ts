import { Controller, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { UpdateCompany } from '@app/useCases/company/update-company/update-company';
import { UpdateCompanyDTO } from '../../dtos/companies/update-company.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('company')
export class UpdateCompanyController {
  constructor(private updateCompany: UpdateCompany) {}

  @UseGuards(JwtAuthGuard)
  @Patch('update/:companyId')
  async create(
    @Body() body: UpdateCompanyDTO,
    @Param('companyId') companyId: string,
  ) {
    const { updatedCompany } = await this.updateCompany.execute(
      body,
      companyId,
    );

    return updatedCompany;
  }
}

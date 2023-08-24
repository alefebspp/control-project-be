import { FindCompany } from '@app/useCases/company/find-company/find-company';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('company/find')
export class FindCompanyController {
  constructor(private findCompany: FindCompany) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:companyId')
  async find(@Param('companyId') companyId: string) {
    const { company } = await this.findCompany.execute(companyId);

    return company;
  }
}

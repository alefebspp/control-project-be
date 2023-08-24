import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';

import { CreateCompanyController } from './create-company-controller';
import { FindCompanyController } from './find-company-controller';
import { UpdateCompanyController } from './update-company-controller';

import { CreateCompany } from '@app/useCases/company/create-company/create-company';
import { FindCompany } from '@app/useCases/company/find-company/find-company';
import { UpdateCompany } from '@app/useCases/company/update-company/update-company';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateCompanyController,
    FindCompanyController,
    UpdateCompanyController,
  ],
  providers: [CreateCompany, FindCompany, UpdateCompany],
})
export class CompaniesControllerModule {}

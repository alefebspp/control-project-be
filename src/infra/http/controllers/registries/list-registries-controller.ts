import { ListRegistries } from '@app/useCases/registry/list-registries/list-registries';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

interface ListRegistriesQuerys {
  period?: string;
  collaboratorName?: string;
  take?: number;
  skip?: number;
}

@Controller('registry')
export class ListRegistriesController {
  constructor(private listRegistries: ListRegistries) {}

  @UseGuards(JwtAuthGuard)
  @Get('/all/:companyId')
  async list(
    @Param('companyId') company_id: string,
    @Query() { period, collaboratorName, skip }: ListRegistriesQuerys,
  ) {
    const response = await this.listRegistries.execute({
      company_id,
      period,
      skip,
      collaborator_name: collaboratorName,
    });

    return {
      ...response,
    };
  }
}

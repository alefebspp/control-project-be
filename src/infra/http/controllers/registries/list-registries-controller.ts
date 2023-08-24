import { ListRegistries } from '@app/useCases/registry/list-registries/list-registries';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('registry')
export class ListRegistriesController {
  constructor(private listRegistries: ListRegistries) {}

  @UseGuards(JwtAuthGuard)
  @Get('/all/:companyId')
  async list(@Param('companyId') companyId: string) {
    const { registries } = await this.listRegistries.execute(companyId);

    return registries;
  }
}

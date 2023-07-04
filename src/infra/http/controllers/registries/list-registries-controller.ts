import { ListRegistries } from '@app/useCases/registry/list-registries/list-registries';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('registry')
export class ListRegistriesController {
  constructor(private listRegistries: ListRegistries) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async list() {
    const { registries } = await this.listRegistries.execute();

    return registries;
  }
}

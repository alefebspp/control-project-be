import { ListRegistries } from '@app/useCases/registry/list-registries/list-registries';
import { Controller, Get } from '@nestjs/common';

@Controller('registry')
export class ListRegistriesController {
  constructor(private listRegistries: ListRegistries) {}

  @Get()
  async list() {
    const { registries } = await this.listRegistries.execute();

    return registries;
  }
}

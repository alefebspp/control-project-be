import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateRegistryDTO } from '../../dtos/registries/create-registry.dto';
import { CreateRegistry } from '@app/useCases/registry/create-registry/create-registry';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

interface Response {
  date: Date;
  start?: string;
  end?: string;
  interval_start?: string;
  interval_end?: string;
}

@Controller('registry')
export class CreateRegistryController {
  constructor(private readonly createRegistry: CreateRegistry) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: CreateRegistryDTO): Promise<Response> {
    const { registry } = await this.createRegistry.execute({
      ...body,
    });

    return registry;
  }
}

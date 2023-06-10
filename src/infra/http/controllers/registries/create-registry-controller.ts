import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRegistryDTO } from '../../dtos/registries/create-registry.dto';
import { CreateRegistry } from '@app/useCases/registry/create-registry/create-registry';

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

  @Post('create')
  async create(@Body() body: CreateRegistryDTO): Promise<Response> {
    const {
      start,
      start_location,
      interval_start,
      interval_start_location,
      interval_end,
      interval_end_location,
      end,
      end_location,
      date,
      collaborator_id,
    } = body;

    const { registry } = await this.createRegistry.execute({
      date,
      start,
      start_location,
      interval_start,
      interval_start_location,
      interval_end,
      interval_end_location,
      end,
      end_location,
      collaborator_id,
    });

    return registry;
  }
}

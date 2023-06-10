import { UpdateRegistryDTO } from '../../dtos/registries/update-registry.dto';
import { UpdateRegistry } from '@app/useCases/registry/update-registry/update-registry';
import { Controller, Patch, Param, Body } from '@nestjs/common';

@Controller('registry')
export class UpdateRegistryController {
  constructor(private updateRegistry: UpdateRegistry) {}
  @Patch('/:registryId')
  async update(
    @Param('registryId') registryId: string,
    @Body() body: UpdateRegistryDTO,
  ) {
    const {
      start,
      start_location,
      end,
      end_location,
      interval_end,
      interval_end_location,
      interval_start,
      interval_start_location,
    } = body;

    const registry = await this.updateRegistry.execute({
      registry_id: registryId,
      data: {
        start,
        start_location,
        end,
        end_location,
        interval_end,
        interval_end_location,
        interval_start,
        interval_start_location,
      },
    });

    return registry;
  }
}

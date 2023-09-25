import { UpdateRegistryDTO } from '../../dtos/registries/update-registry.dto';
import { UpdateRegistry } from '@app/useCases/registry/update-registry/update-registry';
import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('registry')
export class UpdateRegistryController {
  constructor(private updateRegistry: UpdateRegistry) {}

  @UseGuards(JwtAuthGuard)
  @Patch('/:registryId')
  async update(
    @Param('registryId') registry_id: string,
    @Body() body: UpdateRegistryDTO,
  ) {
    const { registry_type, ...params } = body;
    const registry = await this.updateRegistry.execute({
      registry_id,
      registry_type: registry_type,
      data: {
        ...params,
      },
    });

    return registry;
  }
}

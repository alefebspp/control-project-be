import { FindCollaboratorRegistries } from '@app/useCases/registry/find-collaborator-registry/find-collaborator-registries';
import { Controller, Get, Param, Query } from '@nestjs/common';

interface FindCollaboratorResgistriesQueryParams {
  date?: string;
}

@Controller('registry')
export class FindCollaboratorRegistryController {
  constructor(private findCollaboratorRegistries: FindCollaboratorRegistries) {}

  @Get('/:collaboratorId')
  async find(
    @Param('collaboratorId') collaboratorId: string,
    @Query() query: FindCollaboratorResgistriesQueryParams,
  ) {
    const { date } = query;

    const registry = await this.findCollaboratorRegistries.execute(
      collaboratorId,
      date,
    );

    if (date) {
      return registry[0];
    } else {
      return registry;
    }
  }
}

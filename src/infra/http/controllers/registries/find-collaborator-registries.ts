import { FindCollaboratorRegistries } from '@app/useCases/registry/find-collaborator-registry/find-collaborator-registries';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

interface FindCollaboratorResgistriesQueryParams {
  date?: string;
}

@Controller('registry')
export class FindCollaboratorRegistryController {
  constructor(private findCollaboratorRegistries: FindCollaboratorRegistries) {}

  @UseGuards(JwtAuthGuard)
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

    return registry;
  }
}

import { FindCollaborator } from '@app/useCases/collaborator/find-collaborator/find-collaborator';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('collaborator')
export class FindCollaboratorController {
  constructor(private findCollaborator: FindCollaborator) {}

  @Get('/:collaboratorId')
  async find(@Param('collaboratorId') collaboratorId: string) {
    const { collaborator } = await this.findCollaborator.execute(
      collaboratorId,
    );

    return collaborator;
  }
}

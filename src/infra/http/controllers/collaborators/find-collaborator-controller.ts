import { FindCollaborator } from '@app/useCases/collaborator/find-collaborator/find-collaborator';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('collaborator')
export class FindCollaboratorController {
  constructor(private findCollaborator: FindCollaborator) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:collaboratorId')
  async find(@Param('collaboratorId') collaboratorId: string) {
    const { collaborator } = await this.findCollaborator.execute(
      collaboratorId,
    );

    return collaborator;
  }
}

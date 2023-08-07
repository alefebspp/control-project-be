import { DeleteCollaborator } from '@app/useCases/collaborator/delete-collaborator/delete-collaborator';
import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('collaborator/delete')
export class DeleteCollaboratorController {
  constructor(private deleteCollaborator: DeleteCollaborator) {}

  @UseGuards(JwtAuthGuard)
  @Delete('/:collaboratorId')
  async delete(@Param('collaboratorId') collaboratorId: string) {
    const response = await this.deleteCollaborator.execute(collaboratorId);

    return response;
  }
}

import { Controller, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { UpdateCollaborator } from '@app/useCases/collaborator/update-collaborator/update-collaborator';
import { UpdateCollaboratorDTO } from '../../dtos/collaboratos/update-collaborator.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('collaborator')
export class UpdateCollaboratorController {
  constructor(private updateCollaborator: UpdateCollaborator) {}

  @UseGuards(JwtAuthGuard)
  @Patch('update/:collaboratorId')
  async create(
    @Body() body: UpdateCollaboratorDTO,
    @Param('collaboratorId') collaboratorId: string,
  ) {
    const updatedCollaborator = await this.updateCollaborator.execute(
      {
        ...body,
      },
      collaboratorId,
    );

    return updatedCollaborator;
  }
}

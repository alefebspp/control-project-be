import { ListCollaborators } from '@app/useCases/collaborator/list-collaborators/list-collaborators';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('collaborator/list')
export class ListCollaboratorsController {
  constructor(private listCollaborators: ListCollaborators) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async list() {
    const collaborators = await this.listCollaborators.execute();

    return collaborators;
  }
}

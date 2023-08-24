import { ListCollaborators } from '@app/useCases/collaborator/list-collaborators/list-collaborators';
import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

interface ListCollaboratorsQueryParams {
  companyId: string;
}

@Controller('collaborator/list')
export class ListCollaboratorsController {
  constructor(private listCollaborators: ListCollaborators) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async list(@Query() { companyId }: ListCollaboratorsQueryParams) {
    const collaborators = await this.listCollaborators.execute(companyId);

    return collaborators;
  }
}

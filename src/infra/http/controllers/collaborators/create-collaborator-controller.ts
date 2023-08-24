import { Controller, Post, Body } from '@nestjs/common';
import { CreateCollaborator } from '@app/useCases/collaborator/create-collaborator/create-collaborator';
import { CreateCollaboratorDTO } from '../../dtos/collaboratos/create-collaborator.dto';

@Controller('collaborator')
export class CreateCollaboratorController {
  constructor(private createColaborator: CreateCollaborator) {}

  @Post('create')
  async create(@Body() body: CreateCollaboratorDTO) {
    const { collaborator } = await this.createColaborator.execute({
      ...body,
    });

    return collaborator;
  }
}

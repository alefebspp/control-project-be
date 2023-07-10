import { Controller, Post, Body } from '@nestjs/common';
import { CreateCollaborator } from '@app/useCases/collaborator/create-collaborator/create-collaborator';
import { CreateCollaboratorDTO } from '../../dtos/collaboratos/create-collaborator.dto';

@Controller('collaborator')
export class CreateCollaboratorController {
  constructor(private createColaborator: CreateCollaborator) {}

  @Post('create')
  async create(@Body() body: CreateCollaboratorDTO) {
    const {
      name,
      surname,
      email,
      password,
      shift_end,
      shift_start,
      interval_end,
      interval_start,
    } = body;

    const { collaborator } = await this.createColaborator.execute({
      name,
      surname,
      email,
      password,
      shift_end,
      shift_start,
      interval_end,
      interval_start,
    });

    return collaborator;
  }
}

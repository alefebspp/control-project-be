import { CreateAdjustment } from '@app/useCases/request/create-adjustment/create-adjustment';
import { Controller, Post, Body } from '@nestjs/common';
import { CreateAdjustmentDTO } from '../../dtos/requests/create-adjustment.dto';

@Controller('requests')
export class CreateAdjustmentController {
  constructor(private createAdjustment: CreateAdjustment) {}

  @Post()
  async create(@Body() body: CreateAdjustmentDTO) {
    const {
      reason,
      registry_id,
      registry_location,
      registry_type,
      status,
      new_value,
      collaborator_id,
      previous_value,
      new_location,
    } = body;

    const adjustment = await this.createAdjustment.execute({
      reason,
      registry_id,
      registry_location,
      registry_type,
      status,
      new_value,
      collaborator_id,
      previous_value,
      new_location,
    });

    return adjustment;
  }
}

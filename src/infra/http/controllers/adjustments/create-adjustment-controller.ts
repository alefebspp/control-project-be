import { CreateAdjustment } from '@app/useCases/request/create-adjustment/create-adjustment';
import { Controller, Post, Body } from '@nestjs/common';
import { CreateAdjustmentDTO } from '../../dtos/requests/create-adjustment.dto';

@Controller('requests')
export class CreateAdjustmentController {
  constructor(private createAdjustment: CreateAdjustment) {}

  @Post()
  async create(@Body() body: CreateAdjustmentDTO) {
    const adjustment = await this.createAdjustment.execute({
      ...body,
    });

    return adjustment;
  }
}

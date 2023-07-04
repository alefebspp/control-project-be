import { ListAdjustments } from '@app/useCases/request/list-adjustments/list-adjustments';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('requests')
export class ListAdjustmentController {
  constructor(private listAdjustments: ListAdjustments) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async list() {
    const adjustments = await this.listAdjustments.execute();

    return adjustments;
  }
}

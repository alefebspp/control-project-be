import { FindAdjustment } from '@app/useCases/request/find-adjustment/find-adjustment';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('requests')
export class FindAdjustmentController {
  constructor(private findAdjustment: FindAdjustment) {}
  @Get('/find/:adjustmentId')
  async find(@Param('adjustmentId') adjustmentId: string) {
    const adjustment = await this.findAdjustment.execute(adjustmentId);

    return adjustment;
  }
}

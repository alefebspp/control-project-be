import { ValidateAdjustment } from '@app/useCases/request/validate-adjustment/validate-adjustment';
import { Controller, Patch, Param, Body } from '@nestjs/common';
import { ValidateAdjustmentDTO } from '../../dtos/requests/validate-adjustment.dto';

@Controller('requests')
export class ValidateAdjustmentController {
  constructor(private validateAdjustment: ValidateAdjustment) {}

  @Patch('/:adjustmentId')
  async validate(
    @Param('adjustmentId') adjustmentId: string,
    @Body() body: ValidateAdjustmentDTO,
  ) {
    const { reviewer, new_status } = body;

    const evaluatedAdjustment = await this.validateAdjustment.execute(
      adjustmentId,
      reviewer,
      new_status,
    );

    return evaluatedAdjustment;
  }
}

import { CheckAdjustmentExistence } from '@app/useCases/request/check-adjustment-existence/check-adjustment-existence';
import { Controller, Get, Param, Query } from '@nestjs/common';

interface CheckAdjustmentExistenceQueryParams {
  registryType?: string;
}

@Controller('requests')
export class CheckAdjustmentExistenceController {
  constructor(private checkAdjustmentExistence: CheckAdjustmentExistence) {}

  @Get('/:registryId')
  async findByRegistryId(
    @Param('registryId') registryId: string,
    @Query() query: CheckAdjustmentExistenceQueryParams,
  ) {
    const { registryType } = query;

    const adjustment = await this.checkAdjustmentExistence.execute(
      registryId,
      registryType,
    );

    return adjustment;
  }
}

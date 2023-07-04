import { FindAdjustmentByRegistryId } from '@app/useCases/request/find-adjustment-by-registry-id/find-adjustment-by-registry-id';
import { Controller, Get, Param, Query } from '@nestjs/common';

interface FindAdjustmentQueryParams {
  registryType?: string;
}

@Controller('requests')
export class FindAdjustmentByRegistryIdController {
  constructor(private findAdjustmentByRegistryId: FindAdjustmentByRegistryId) {}

  @Get('/:registryId')
  async findByRegistryId(
    @Param('registryId') registryId: string,
    @Query() query: FindAdjustmentQueryParams,
  ) {
    const { registryType } = query;

    const adjustment = await this.findAdjustmentByRegistryId.execute(
      registryId,
      registryType,
    );

    return adjustment;
  }
}

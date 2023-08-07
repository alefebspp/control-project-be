import { ListAdjustments } from '@app/useCases/request/list-adjustments/list-adjustments';
import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

interface ListAdjustmentsQueryParams {
  collaboratorId?: string;
  period?: string;
}

@Controller('requests')
export class ListAdjustmentController {
  constructor(private listAdjustments: ListAdjustments) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@Query() query: ListAdjustmentsQueryParams) {
    const { collaboratorId, period } = query;

    const adjustments = await this.listAdjustments.execute(
      collaboratorId,
      period,
    );

    return adjustments;
  }
}
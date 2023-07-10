import { CalculateRegistriesHours } from '@app/useCases/registry/calculate-registries-hours/calculate-registries-hours';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

interface CalculateRegistriesHoursQueryParams {
  period: string;
}

@Controller('registry')
export class CalculateRegistriesHoursController {
  constructor(private calculateRegistriesHours: CalculateRegistriesHours) {}

  @UseGuards(JwtAuthGuard)
  @Get('/calculate/:collaboratorId')
  async calculate(
    @Param('collaboratorId') collaborator_id: string,
    @Query() query: CalculateRegistriesHoursQueryParams,
  ) {
    const { period } = query;
    const statistics = await this.calculateRegistriesHours.execute(
      collaborator_id,
      period,
    );

    return statistics;
  }
}

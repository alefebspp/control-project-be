import { GetCollaboratorHourRecordsSum } from '@app/useCases/hour-record/get-hour-records-sum/get-collaborator-hour-records-sum';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

interface GetCollaboratorHourRecordsSumQuerys {
  period?: string;
}

@Controller('hour-record')
export class GetCollaboratorHourRecordsSumController {
  constructor(
    private getCollaboratorHourRecordsSum: GetCollaboratorHourRecordsSum,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:collaboratorId')
  async find(
    @Param('collaboratorId') collaboratorId: string,
    @Query() query: GetCollaboratorHourRecordsSumQuerys,
  ) {
    const { period } = query;

    const hourRecordSumAndMonthLabel = await this.getCollaboratorHourRecordsSum.execute(
      collaboratorId,
      period,
    );

    return hourRecordSumAndMonthLabel;
  }
}

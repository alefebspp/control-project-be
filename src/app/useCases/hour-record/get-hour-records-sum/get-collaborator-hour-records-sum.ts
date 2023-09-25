import { CollaboratorsRepository } from '@app/repositories/collaborators-repository';
import { HourRecordRepository } from '@app/repositories/hour-record-repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { monthMap } from 'src/shared/utils/maps';
import { secondsToHhMm } from 'src/shared/utils/registryOperations';

@Injectable()
export class GetCollaboratorHourRecordsSum {
  constructor(
    private hourRecordRepository: HourRecordRepository,
    private collaboratorsRepository: CollaboratorsRepository,
  ) {}

  async execute(collaborator_id: string, period?: string) {
    const collaborator = await this.collaboratorsRepository.find(
      collaborator_id,
    );

    if (!collaborator) {
      throw new NotFoundException('Could not find collaborator', {
        cause: new Error(),
        description: 'Does not exists a collaborator with the informed id',
      });
    }
    const periodMonth = period.split('-')[1];
    let additionalSecondsTotal: number = 0;
    let pendingSecondsTotal: number = 0;

    const collaboratorHourRecords = await this.hourRecordRepository.list(
      collaborator_id,
      period,
    );

    collaboratorHourRecords
      .filter((hour_record) => hour_record.type == 'PENDING')
      .map((hour_record) => {
        pendingSecondsTotal += hour_record.seconds;
      });
    collaboratorHourRecords
      .filter((hour_record) => hour_record.type == 'ADDITIONAL')
      .map((hour_record) => {
        additionalSecondsTotal += hour_record.seconds;
      });

    const hasPositiveHours = additionalSecondsTotal >= pendingSecondsTotal;
    const totalType = hasPositiveHours ? 'additional' : 'pending';
    const totalValue = additionalSecondsTotal - pendingSecondsTotal;

    return {
      total: secondsToHhMm(Math.abs(totalValue)),
      totalType,
      additional: secondsToHhMm(additionalSecondsTotal),
      pending: secondsToHhMm(pendingSecondsTotal),
      monthLabel: monthMap[periodMonth],
    };
  }
}

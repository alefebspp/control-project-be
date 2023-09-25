import { UpdateHourRecordDTO } from '@app/dtos/hour-record.dtos';
import { HourRecordRepository } from '@app/repositories/hour-record-repository';
import { FindCollaborator } from '@app/useCases/collaborator/find-collaborator/find-collaborator';
import { UpdateCollaborator } from '@app/useCases/collaborator/update-collaborator/update-collaborator';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UpdateHourRecord {
  constructor(
    private hourRecordRepository: HourRecordRepository,
    private findCollaborator: FindCollaborator,
    private updateCollaborator: UpdateCollaborator,
  ) {}

  async execute(
    hour_record_id: string,
    collaborator_id: string,
    data: UpdateHourRecordDTO,
  ) {
    const hourRecord = await this.hourRecordRepository.find(hour_record_id);

    if (!hourRecord) {
      throw new NotFoundException('Could not find hour record', {
        cause: new Error(),
        description: 'Does not exists a hour record with the informed id',
      });
    }

    const { collaborator } = await this.findCollaborator.execute(
      collaborator_id,
    );

    const { id: hourRecordId, seconds: previousHourRecordSeconds } = hourRecord;
    const { type: newHourRecordType, seconds: newHourRecordSeconds } = data;

    const additionalHourRecord = newHourRecordType == 'ADDITIONAL';
    const positiveBalance = collaborator.hours_balance > 0;

    const clearPreviousHourBalance = positiveBalance
      ? collaborator.hours_balance - previousHourRecordSeconds
      : collaborator.hours_balance + previousHourRecordSeconds;

    const { hours_balance: newHoursBalance } =
      await this.updateCollaborator.execute(
        {
          hours_balance: clearPreviousHourBalance,
        },
        collaborator.id,
      );

    await this.updateCollaborator.execute(
      {
        hours_balance: additionalHourRecord
          ? newHoursBalance + newHourRecordSeconds
          : newHoursBalance - newHourRecordSeconds,
      },
      collaborator.id,
    );

    await this.hourRecordRepository.update(hourRecordId, {
      type: newHourRecordType,
      seconds: newHourRecordSeconds,
    });

    return {
      message: 'Hour record updated with success!',
    };
  }
}

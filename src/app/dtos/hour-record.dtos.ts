import { HourRecordType } from '@app/entities/hour-record/hour-record';

export interface UpdateHourRecordDTO {
  type?: HourRecordType;
  seconds?: number;
}

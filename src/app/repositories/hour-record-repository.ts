import { UpdateHourRecordDTO } from '@app/dtos/hour-record.dtos';
import { HourRecord } from '@app/entities/hour-record/hour-record';

export interface HourRecordResponse extends Omit<HourRecord, '_id' | 'props'> {}

export abstract class HourRecordRepository {
  abstract create(hours: HourRecord): Promise<void>;

  abstract findByRegistryId(
    registry_id: string,
    registry_type?: string,
  ): Promise<HourRecordResponse>;

  abstract find(id: string): Promise<HourRecordResponse>;

  abstract update(id: string, data: UpdateHourRecordDTO): Promise<void>;

  abstract list(
    collaborator_id: string,
    period?: string,
  ): Promise<HourRecordResponse[]>;
}

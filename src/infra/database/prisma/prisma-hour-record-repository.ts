import { HourRecord } from '@app/entities/hour-record/hour-record';
import {
  HourRecordResponse,
  HourRecordRepository,
} from '@app/repositories/hour-record-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UpdateHourRecordDTO } from '@app/dtos/hour-record.dtos';
import { addMonths } from 'date-fns';

@Injectable()
export class PrismaHoursRepository implements HourRecordRepository {
  constructor(private prismaService: PrismaService) {}

  async list(
    collaborator_id: string,
    period?: string,
  ): Promise<HourRecordResponse[]> {
    let where = {
      collaborator_id,
    };

    if (period) {
      const periodDate = new Date(period);
      const nextMonth = addMonths(periodDate, 1);
      Object.assign(where, {
        created_at: {
          gte: periodDate,
          lt: nextMonth,
        },
      });
    }

    const hourRecords = await this.prismaService.hourRecord.findMany({
      where,
    });

    return hourRecords;
  }

  async find(id: string): Promise<HourRecordResponse> {
    const hourRecord = await this.prismaService.hourRecord.findUnique({
      where: {
        id,
      },
    });

    return hourRecord;
  }

  async update(id: string, data: UpdateHourRecordDTO): Promise<void> {
    await this.prismaService.hourRecord.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  async findByRegistryId(
    registry_id: string,
    registry_type?: string,
  ): Promise<HourRecordResponse> {
    let where = {
      registry_id,
    };

    if (registry_type) {
      Object.assign(where, {
        registry_type,
      });
    }

    const hourRecord = await this.prismaService.hourRecord.findFirst({
      where,
    });

    if (hourRecord == null) {
      return undefined;
    }

    return hourRecord;
  }

  async create({
    id,
    collaborator_id,
    type,
    seconds,
    registry_type,
    registry_id,
  }: HourRecord): Promise<void> {
    await this.prismaService.hourRecord.create({
      data: {
        id,
        collaborator_id,
        type,
        seconds,
        registry_type,
        registry_id,
      },
    });
  }
}

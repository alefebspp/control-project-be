import {
  DefaultAdjustmentResponse,
  AdjustmentsRepository,
  ValidateAdjustmentDTO,
} from '@app/repositories/adjustments-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Adjustment } from '@app/entities/adjustment/adjustment';
import { addMonths } from 'date-fns';

@Injectable()
export class PrismaAdjustmentsRepository implements AdjustmentsRepository {
  constructor(private prismaService: PrismaService) {}

  async find(adjustmentId: string): Promise<DefaultAdjustmentResponse> {
    const adjustment = await this.prismaService.adjustment.findUnique({
      where: {
        id: adjustmentId,
      },
    });

    return adjustment;
  }

  async validateAdjustment(
    validateData: ValidateAdjustmentDTO,
  ): Promise<DefaultAdjustmentResponse> {
    const evaluatedAdjustment = await this.prismaService.adjustment.update({
      where: {
        id: validateData.adjustmentId,
      },
      data: {
        status: validateData.newStatus,
        reviewer: validateData.reviewer,
      },
      include: {
        registry: true,
        collaborator: {
          select: {
            id: true,
            name: true,
            surname: true,
            avatar: true,
            shift_start: true,
            shift_end: true,
            interval_start: true,
            interval_end: true,
          },
        },
        adjustment_reviewer: {
          select: {
            id: true,
            name: true,
            surname: true,
            avatar: true,
          },
        },
      },
    });

    return evaluatedAdjustment;
  }

  async checkAdjustmentExistence(
    registryId: string,
    registryType: string,
  ): Promise<DefaultAdjustmentResponse> {
    const adjustment = await this.prismaService.adjustment.findFirst({
      where: {
        registry_id: registryId,
        registry_type: registryType,
        status: 'PENDING',
      },
    });

    return adjustment;
  }

  async list(
    company_id?: string,
    collaborator_id?: string,
    period?: string,
  ): Promise<DefaultAdjustmentResponse[]> {
    let where = {};

    if (collaborator_id) {
      Object.assign(where, {
        collaborator_id,
      });
    }

    if (company_id) {
      Object.assign(where, {
        company_id,
      });
    }

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

    const adjustments = await this.prismaService.adjustment.findMany({
      where,
      include: {
        registry: true,
        collaborator: {
          select: {
            id: true,
            name: true,
            surname: true,
            avatar: true,
            shift_start: true,
            shift_end: true,
            interval_start: true,
            interval_end: true,
          },
        },
        adjustment_reviewer: {
          select: {
            id: true,
            name: true,
            surname: true,
            avatar: true,
          },
        },
      },
    });

    return adjustments;
  }

  async create(adjustment: Adjustment): Promise<DefaultAdjustmentResponse> {
    const newAdjustment = await this.prismaService.adjustment.create({
      data: {
        new_value: adjustment.new_value,
        previous_value: adjustment.previous_value,
        id: adjustment.id,
        reason: adjustment.reason,
        registry_location: adjustment.registry_location,
        new_location: adjustment.new_location,
        registry_type: adjustment.registry_type,
        registry_id: adjustment.registry_id,
        collaborator_id: adjustment.collaborator_id,
        company_id: adjustment.company_id,
      },
    });

    return newAdjustment;
  }
}

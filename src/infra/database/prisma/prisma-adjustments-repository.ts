import {
  DefaultAdjustmentResponse,
  AdjustmentsRepository,
  ValidateAdjustmentDTO,
} from '@app/repositories/adjustments-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Adjustment } from '@app/entities/adjustment/adjustment';

@Injectable()
export class PrismaAdjustmentsRepository implements AdjustmentsRepository {
  constructor(private prismaService: PrismaService) {}

  async find(adjustmentId: string): Promise<DefaultAdjustmentResponse> {
    const adjustment = await this.prismaService.request.findUnique({
      where: {
        id: adjustmentId,
      },
    });

    return adjustment;
  }

  async validateAdjustment(
    validateData: ValidateAdjustmentDTO,
  ): Promise<DefaultAdjustmentResponse> {
    const evaluatedAdjustment = await this.prismaService.request.update({
      where: {
        id: validateData.adjustmentId,
      },
      data: {
        status: validateData.newStatus,
        reviewer: validateData.reviewer,
      },
    });

    return evaluatedAdjustment;
  }

  async checkIfAdjustmentExistsByRegistry(
    registryId: string,
    registryType: string,
  ): Promise<DefaultAdjustmentResponse> {
    const adjustment = await this.prismaService.request.findFirst({
      where: {
        registry_id: registryId,
        registry_type: registryType,
        status: 'PENDING',
      },
    });

    return adjustment;
  }

  async list(): Promise<DefaultAdjustmentResponse[]> {
    const adjustments = await this.prismaService.request.findMany({
      include: {
        registry: true,
        collaborator: {
          select: {
            id: true,
            name: true,
            surname: true,
          },
        },
        request_reviewer: {
          select: {
            id: true,
            name: true,
            surname: true,
          },
        },
      },
    });

    return adjustments;
  }

  async create(adjustment: Adjustment): Promise<DefaultAdjustmentResponse> {
    const newAdjustment = await this.prismaService.request.create({
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
      },
    });

    return newAdjustment;
  }
}

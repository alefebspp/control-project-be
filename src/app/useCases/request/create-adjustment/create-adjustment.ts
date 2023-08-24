import { Injectable } from '@nestjs/common';
import { AdjustmentsRepository } from '@app/repositories/adjustments-repository';
import { CreateAdjustmentDTO } from '@app/dtos/adjustment.dtos';
import { Adjustment } from '@app/entities/adjustment/adjustment';

@Injectable()
export class CreateAdjustment {
  constructor(private adjustmentsRepository: AdjustmentsRepository) {}

  async execute(data: CreateAdjustmentDTO) {
    const adjustment = new Adjustment({
      ...data,
    });

    const newAdjustment = await this.adjustmentsRepository.create(adjustment);

    return newAdjustment;
  }
}

import { Injectable } from '@nestjs/common';
import { AdjustmentsRepository } from '@app/repositories/adjustments-repository';
import { CreateAdjustmentDTO } from '@app/dtos/adjustment.dtos';
import { Adjustment } from '@app/entities/adjustment/adjustment';

@Injectable()
export class CreateAdjustment {
  constructor(private adjustmentsRepository: AdjustmentsRepository) {}

  async execute(data: CreateAdjustmentDTO) {
    const adjustment = new Adjustment({
      registry_id: data.registry_id,
      reason: data.reason,
      registry_location: data.registry_location,
      new_location: data.new_location,
      registry_type: data.registry_type,
      status: data.status,
      new_value: data.new_value,
      previous_value: data.previous_value,
      collaborator_id: data.collaborator_id,
    });

    const newAdjustment = await this.adjustmentsRepository.create(adjustment);

    return newAdjustment;
  }
}

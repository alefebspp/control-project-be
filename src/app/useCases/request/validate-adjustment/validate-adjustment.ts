import { StatusType } from '@app/entities/adjustment/adjustment';
import { AdjustmentsRepository } from '@app/repositories/adjustments-repository';
import { RegistriesRepository } from '@app/repositories/registries-repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ValidateAdjustment {
  constructor(
    private adjustmentsRepository: AdjustmentsRepository,
    private registriesRepository: RegistriesRepository,
  ) {}

  async execute(adjustmentId: string, reviewer: string, newStatus: StatusType) {
    const adjustment = await this.adjustmentsRepository.find(adjustmentId);

    if (!adjustment) {
      throw new NotFoundException('Could not find adjustment', {
        cause: new Error(),
        description: 'Could not find adjustment with the informed id',
      });
    }

    const evaluatedAdjustment =
      await this.adjustmentsRepository.validateAdjustment({
        reviewer,
        adjustmentId,
        newStatus,
      });

    if (newStatus == 'ACCEPTED') {
      await this.registriesRepository.update(evaluatedAdjustment.registry_id, {
        [evaluatedAdjustment.registry_type]: evaluatedAdjustment.new_value,
        [`${evaluatedAdjustment.registry_type}_location`]:
          evaluatedAdjustment.new_location,
      });
    }

    return evaluatedAdjustment;
  }
}

import { StatusType } from '@app/entities/adjustment/adjustment';
import { AdjustmentsRepository } from '@app/repositories/adjustments-repository';
import { RegistriesRepository } from '@app/repositories/registries-repository';
import { CreateHourRecord } from '@app/useCases/hour-record/create-hour-record/create-hour-record';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ValidateAdjustment {
  constructor(
    private adjustmentsRepository: AdjustmentsRepository,
    private registriesRepository: RegistriesRepository,
    private createHourRecord: CreateHourRecord,
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

    const {
      registry_id,
      registry_type,
      new_value,
      new_location,
      collaborator_id,
    } = evaluatedAdjustment;

    if (newStatus == 'ACCEPTED') {
      await this.registriesRepository.update(registry_id, {
        [registry_type]: new_value,
        [`${registry_type}_location`]: new_location,
      });

      await this.createHourRecord.execute(collaborator_id, registry_id, {
        registry_type,
        new_registry: new_value,
      });
    }

    return evaluatedAdjustment;
  }
}

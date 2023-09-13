import { Injectable } from '@nestjs/common';
import { AdjustmentsRepository } from '@app/repositories/adjustments-repository';

@Injectable()
export class CheckAdjustmentExistence {
  constructor(private adjustmentsRepository: AdjustmentsRepository) {}

  async execute(registry_id: string, registryType: string) {
    const adjustment =
      await this.adjustmentsRepository.checkAdjustmentExistence(
        registry_id,
        registryType,
      );

    if (!adjustment) {
      return false;
    } else {
      return true;
    }
  }
}

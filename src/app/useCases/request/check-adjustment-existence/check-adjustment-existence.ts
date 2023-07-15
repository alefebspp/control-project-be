import { Injectable } from '@nestjs/common';
import { AdjustmentsRepository } from '@app/repositories/adjustments-repository';

@Injectable()
export class CheckAdjustmentExistence {
  constructor(private adjustmentsRepository: AdjustmentsRepository) {}

  async execute(registryId: string, registryType: string) {
    const adjustment =
      await this.adjustmentsRepository.checkAdjustmentExistence(
        registryId,
        registryType,
      );

    if (!adjustment) {
      return false;
    } else {
      return true;
    }
  }
}

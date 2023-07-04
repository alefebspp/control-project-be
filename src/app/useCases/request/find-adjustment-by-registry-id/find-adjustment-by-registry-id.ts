import { Injectable } from '@nestjs/common';
import { AdjustmentsRepository } from '@app/repositories/adjustments-repository';

@Injectable()
export class FindAdjustmentByRegistryId {
  constructor(private adjustmentsRepository: AdjustmentsRepository) {}

  async execute(registryId: string, registryType: string) {
    const adjustment =
      await this.adjustmentsRepository.checkIfAdjustmentExistsByRegistry(
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

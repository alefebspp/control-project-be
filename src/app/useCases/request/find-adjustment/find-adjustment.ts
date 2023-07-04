import { AdjustmentsRepository } from '@app/repositories/adjustments-repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindAdjustment {
  constructor(private adjustmentsRepository: AdjustmentsRepository) {}

  async execute(adjustmentId: string) {
    const adjustment = await this.adjustmentsRepository.find(adjustmentId);

    if (!adjustment) {
      throw new NotFoundException('Could not find adjustment', {
        cause: new Error(),
        description: 'Does not exists a adjustment with the informed id',
      });
    }

    return adjustment;
  }
}

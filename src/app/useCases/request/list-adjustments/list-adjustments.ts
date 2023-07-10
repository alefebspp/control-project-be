import { AdjustmentsRepository } from '@app/repositories/adjustments-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAdjustments {
  constructor(private adjustmentsRepository: AdjustmentsRepository) {}

  async execute(collaborator_id?: string, period?: string) {
    const adjustments = await this.adjustmentsRepository.list(
      collaborator_id,
      period,
    );

    return adjustments;
  }
}

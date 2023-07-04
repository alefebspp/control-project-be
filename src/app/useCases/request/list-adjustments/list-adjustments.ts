import { AdjustmentsRepository } from '@app/repositories/adjustments-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAdjustments {
  constructor(private adjustmentsRepository: AdjustmentsRepository) {}

  async execute() {
    const adjustments = await this.adjustmentsRepository.list();

    return adjustments;
  }
}

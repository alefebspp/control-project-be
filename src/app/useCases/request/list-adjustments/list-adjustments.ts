import { AdjustmentsRepository } from '@app/repositories/adjustments-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListAdjustments {
  constructor(private adjustmentsRepository: AdjustmentsRepository) {}

  async execute(
    company_id?: string,
    collaborator_id?: string,
    period?: string,
  ) {
    const adjustments = await this.adjustmentsRepository.list(
      company_id,
      collaborator_id,
      period,
    );

    return adjustments;
  }
}

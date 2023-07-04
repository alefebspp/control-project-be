import { Adjustment } from '@app/entities/adjustment/adjustment';
import {
  DefaultAdjustmentResponse,
  AdjustmentsRepository,
  ValidateAdjustmentDTO,
} from '@app/repositories/adjustments-repository';

export class InMemoryRequestsRepository implements AdjustmentsRepository {
  find(adjustmentId: string): Promise<DefaultAdjustmentResponse> {
    throw new Error('Method not implemented.');
  }
  validateAdjustment(
    validateData: ValidateAdjustmentDTO,
  ): Promise<DefaultAdjustmentResponse> {
    throw new Error('Method not implemented.');
  }
  checkIfAdjustmentExistsByRegistry(
    registryId: string,
    registryType: string,
  ): Promise<DefaultAdjustmentResponse> {
    throw new Error('Method not implemented.');
  }
  public adjustments: Adjustment[] = [];

  list(): Promise<DefaultAdjustmentResponse[]> {
    throw new Error('Method not implemented.');
  }

  async create(adjustment: Adjustment): Promise<DefaultAdjustmentResponse> {
    this.adjustments.push(adjustment);

    return adjustment;
  }
}

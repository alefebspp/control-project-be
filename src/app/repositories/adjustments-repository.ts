import { ValidateAdjustmentDTO } from '@app/dtos/adjustment.dtos';
import { Adjustment } from '@app/entities/adjustment/adjustment';
export type { ValidateAdjustmentDTO };

export interface DefaultAdjustmentResponse
  extends Omit<
    Adjustment,
    '_id' | 'props' | 'reviewer' | 'reviewer_response'
  > {}

export abstract class AdjustmentsRepository {
  abstract create(adjustment: Adjustment): Promise<DefaultAdjustmentResponse>;

  abstract list(
    collaborator_id?: string,
    period?: string,
  ): Promise<DefaultAdjustmentResponse[]>;

  abstract find(adjustmentId: string): Promise<DefaultAdjustmentResponse>;

  abstract validateAdjustment(
    validateData: ValidateAdjustmentDTO,
  ): Promise<DefaultAdjustmentResponse>;

  abstract checkIfAdjustmentExistsByRegistry(
    registryId: string,
    registryType: string | undefined,
  ): Promise<DefaultAdjustmentResponse>;
}

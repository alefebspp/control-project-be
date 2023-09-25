import { ValidateAdjustmentDTO } from '@app/dtos/adjustment.dtos';
import { Adjustment } from '@app/entities/adjustment/adjustment';
export type { ValidateAdjustmentDTO };

export interface ListAdjustmentsResponse {
  adjustments: Omit<
    Adjustment,
    '_id' | 'props' | 'reviewer' | 'reviewer_response'
  >[];
  count?: number;
}

export interface AdjustmentResponse
  extends Omit<
    Adjustment,
    '_id' | 'props' | 'reviewer' | 'reviewer_response'
  > {}

export abstract class AdjustmentsRepository {
  abstract create(adjustment: Adjustment): Promise<AdjustmentResponse>;

  abstract list(
    company_id?: string,
    collaborator_id?: string,
    period?: string,
    collaborator_name?: string,
    skip?: number,
  ): Promise<ListAdjustmentsResponse>;

  abstract find(adjustmentId: string): Promise<AdjustmentResponse>;

  abstract validateAdjustment(
    validateData: ValidateAdjustmentDTO,
  ): Promise<AdjustmentResponse>;

  abstract checkAdjustmentExistence(
    registry_id: string,
    registryType: string | undefined,
  ): Promise<AdjustmentResponse>;
}

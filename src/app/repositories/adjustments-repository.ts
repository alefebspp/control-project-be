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

export interface DefaultAdjustmentResponse
  extends Omit<
    Adjustment,
    '_id' | 'props' | 'reviewer' | 'reviewer_response'
  > {}

export abstract class AdjustmentsRepository {
  abstract create(adjustment: Adjustment): Promise<DefaultAdjustmentResponse>;

  abstract list(
    company_id?: string,
    collaborator_id?: string,
    period?: string,
    collaborator_name?: string,
    skip?: number,
  ): Promise<ListAdjustmentsResponse>;

  abstract find(adjustmentId: string): Promise<DefaultAdjustmentResponse>;

  abstract validateAdjustment(
    validateData: ValidateAdjustmentDTO,
  ): Promise<DefaultAdjustmentResponse>;

  abstract checkAdjustmentExistence(
    registry_id: string,
    registryType: string | undefined,
  ): Promise<DefaultAdjustmentResponse>;
}

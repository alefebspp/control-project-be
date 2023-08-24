import { StatusType } from '@app/entities/adjustment/adjustment';

export interface CreateAdjustmentDTO {
  registry_id: string;
  status?: StatusType;
  collaborator_id: string;
  company_id: string;
  reason: string;
  registry_type: string;
  registry_location?: string;
  new_location: string;
  new_value: string;
  previous_value?: string;
}

export interface ValidateAdjustmentDTO {
  adjustmentId: string;
  newStatus: StatusType;
  reviewer: string;
}

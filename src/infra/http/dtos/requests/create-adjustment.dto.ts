import { StatusType } from '@app/entities/adjustment/adjustment';
import { IsNotEmpty } from 'class-validator';

export class CreateAdjustmentDTO {
  @IsNotEmpty()
  registry_id: string;
  @IsNotEmpty()
  collaborator_id: string;
  @IsNotEmpty()
  company_id: string;
  status: StatusType;
  @IsNotEmpty()
  reason: string;
  @IsNotEmpty()
  registry_type: string;
  registry_location?: string;
  @IsNotEmpty()
  new_location: string;
  @IsNotEmpty()
  new_value: string;
  previous_value?: string;
}

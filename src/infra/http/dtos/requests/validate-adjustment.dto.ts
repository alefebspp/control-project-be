import { StatusType } from '@app/entities/adjustment/adjustment';
import { IsNotEmpty } from 'class-validator';

export class ValidateAdjustmentDTO {
  @IsNotEmpty()
  reviewer: string;
  @IsNotEmpty()
  new_status: StatusType;
}

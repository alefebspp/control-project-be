import { IsNotEmpty } from 'class-validator';

export class CreateCollaboratorDTO {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  surname: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  shift_start: string;
  @IsNotEmpty()
  shift_end: string;
  @IsNotEmpty()
  interval_start: string;
  @IsNotEmpty()
  interval_end: string;
  admin?: boolean;
  company_id?: string;
}

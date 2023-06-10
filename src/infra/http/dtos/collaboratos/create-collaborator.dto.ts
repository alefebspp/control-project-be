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
  shift_start: Date;
  @IsNotEmpty()
  shift_end: Date;
}

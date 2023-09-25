import { IsNotEmpty } from 'class-validator';

export class CreateRegistryDTO {
  @IsNotEmpty()
  date: Date;
  @IsNotEmpty()
  registry_type: string;

  start: string;

  start_location: string;

  end: string;

  end_location: string;

  interval_start: string;

  interval_start_location: string;

  interval_end: string;

  interval_end_location: string;

  @IsNotEmpty()
  collaborator_id: string;
  @IsNotEmpty()
  company_id: string;
}

import { IsNotEmpty } from 'class-validator';

export class UpdateRegistryDTO {
  start: string;

  @IsNotEmpty()
  registry_type: string;

  start_location: string;

  end: string;

  end_location: string;

  interval_start: string;

  interval_start_location: string;

  interval_end: string;

  interval_end_location: string;
}

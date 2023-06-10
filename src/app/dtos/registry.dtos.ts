export interface CreateRegistryDTO {
  date: Date;
  start?: string;
  start_location?: string;
  end?: string;
  end_location?: string;
  interval_start?: string;
  interval_start_location?: string;
  interval_end?: string;
  interval_end_location?: string;
  collaborator_id: string;
}

export interface UpdateRegistryDTO {
  start?: string;
  end?: string;
  interval_start?: string;
  interval_end?: string;
}

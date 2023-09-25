export interface CreateCollaboratorDTO {
  name: string;
  surname: string;
  shift_start: string;
  shift_end: string;
  interval_start: string;
  interval_end: string;
  email: string;
  password: string;
  admin?: boolean;
  manager?: boolean;
  company_id?: string;
}

export interface UpdateCollaboratorDTO {
  name?: string;
  surname?: string;
  shift_start?: string;
  shift_end?: string;
  interval_start?: string;
  interval_end?: string;
  email?: string;
  manager?: boolean;
  hours_balance?: number;
}

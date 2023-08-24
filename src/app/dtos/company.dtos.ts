export interface CreateCompanyDTO {
  name: string;
  email: string;
  logo?: string;
}

export interface UpdateCompanyDTO {
  name?: string;
  email?: string;
  logo?: string;
}
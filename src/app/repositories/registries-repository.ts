import { UpdateRegistryDTO } from '@app/dtos/registry.dtos';
import { Registry } from '../entities/registry/registry';
import { Collaborator } from '@app/entities/collaborator/collaborator';

export interface ListRegistriesResponse {
  registries: (Omit<Registry, 'props' | 'getDayHoursAndMinutes'> & {
    collaborator: Omit<Collaborator, '_id' | 'props'>;
  })[];
  count?: number;
}

export interface RegistryResponse
  extends Omit<Registry, '_id' | 'props' | 'getDayHoursAndMinutes'> {}

export interface StatisticsResponse {
  aditionalTotalHours: string;
  pendingTotalHours: string;
}

export interface ListRegistriesParams {
  company_id: string;
  period?: string;
  collaborator_name?: string;
  skip?: number;
}

export abstract class RegistriesRepository {
  abstract create(registry: Registry): Promise<RegistryResponse>;

  abstract update(
    registry_id: string,
    data: UpdateRegistryDTO,
  ): Promise<RegistryResponse>;

  abstract find(registry_id: string): Promise<RegistryResponse>;

  abstract findCollaboratorRegistries(
    collaborator_id: string,
    date: string | undefined,
    period: string | undefined,
  ): Promise<RegistryResponse[]>;

  abstract list(params: ListRegistriesParams): Promise<ListRegistriesResponse>;
}

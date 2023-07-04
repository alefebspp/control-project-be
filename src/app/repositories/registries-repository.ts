import { UpdateRegistryDTO } from '@app/dtos/registry.dtos';
import { Registry } from '../entities/registry/registry';

export interface ListRegistriesResponse
  extends Omit<Registry, '_id' | 'props' | 'getDayHoursAndMinutes'> {}

export interface DefaultRegistryResponse
  extends Omit<Registry, '_id' | 'props' | 'getDayHoursAndMinutes'> {}

export abstract class RegistriesRepository {
  abstract create(registry: Registry): Promise<void>;

  abstract update(
    registryId: string,
    data: UpdateRegistryDTO,
  ): Promise<DefaultRegistryResponse>;

  abstract find(registryId: string): Promise<DefaultRegistryResponse>;

  abstract findCollaboratorRegistries(
    collaboratorId: string,
    date: string | undefined,
  ): Promise<DefaultRegistryResponse[]>;

  abstract findRegistryByDay(
    collaboratorId: string,
    day: string,
  ): Promise<DefaultRegistryResponse>;
  abstract list(): Promise<ListRegistriesResponse[]>;
}

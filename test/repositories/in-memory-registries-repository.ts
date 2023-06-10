import { UpdateRegistryDTO } from '@app/dtos/registry.dtos';
import { Registry } from '@app/entities/registry/registry';
import {
  DefaultRegistryResponse,
  RegistriesRepository,
} from '@app/repositories/registries-repository';

export class InMemoryRegistriesRepository implements RegistriesRepository {
  update(registryId: string, data: UpdateRegistryDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findCollaboratorRegistries(
    collaboratorId: string,
    day: string,
  ): Promise<DefaultRegistryResponse[]> {
    throw new Error('Method not implemented.');
  }
  async findCollaboratorRegistry(
    collaboratorId: string,
    registryId: string,
  ): Promise<DefaultRegistryResponse> {
    throw new Error('Method not implemented.');
  }

  async findRegistryByDay(
    collaboratorId: string,
    day: string,
  ): Promise<DefaultRegistryResponse> {
    throw new Error('Method not implemented.');
  }
  public registries: Registry[] = [];

  async create(registry: Registry): Promise<void> {
    this.registries.push(registry);
  }

  async list(): Promise<Registry[]> {
    return this.registries;
  }
}

import { UpdateRegistryDTO } from '@app/dtos/registry.dtos';
import { Registry } from '@app/entities/registry/registry';
import {
  DefaultRegistryResponse,
  RegistriesRepository,
} from '@app/repositories/registries-repository';

export class InMemoryRegistriesRepository implements RegistriesRepository {
  public registries: Registry[] = [];

  async update(
    registryId: string,
    data: UpdateRegistryDTO,
  ): Promise<DefaultRegistryResponse> {
    const registry = this.registries.find(
      (registry) => registry.id == registryId,
    );

    for (const key in data) {
      registry[key] = data[key];
    }

    return registry;
  }

  async find(registryId: string): Promise<DefaultRegistryResponse> {
    const registry = this.registries.find(
      (registry) => registry.id == registryId,
    );

    return registry;
  }

  async findCollaboratorRegistries(
    collaboratorId: string,
    day: string,
    period: string,
  ): Promise<DefaultRegistryResponse[]> {
    if (period) {
      const registries = await this.registries.filter((registry) => {
        return registry.date.toISOString().includes(period);
      });
      return registries;
    }

    const registries = await this.registries.filter(
      (registry) => registry.collaborator_id == collaboratorId,
    );
    return registries;
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

  async create(registry: Registry): Promise<void> {
    this.registries.push(registry);
  }

  async list(): Promise<Registry[]> {
    return this.registries;
  }
}

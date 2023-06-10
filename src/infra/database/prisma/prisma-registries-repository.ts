import { Registry } from 'src/app/entities/registry/registry';
import {
  DefaultRegistryResponse,
  ListRegistriesResponse,
  RegistriesRepository,
} from 'src/app/repositories/registries-repository';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { UpdateRegistryDTO } from 'src/infra/http/dtos/registries/update-registry.dto';

@Injectable()
export class PrismaRegistriesRepository implements RegistriesRepository {
  constructor(private prismaService: PrismaService) {}

  async update(
    registryId: string,
    data: UpdateRegistryDTO,
  ): Promise<DefaultRegistryResponse> {
    const registry = await this.prismaService.registry.update({
      where: {
        id: registryId,
      },
      data: {
        start: data.start,
        start_location: data.start_location,
        end: data.end,
        end_location: data.end_location,
        interval_start: data.interval_start,
        interval_start_location: data.interval_start_location,
        interval_end: data.interval_end,
        interval_end_location: data.interval_end_location,
      },
    });

    return registry;
  }

  async findCollaboratorRegistries(
    collaboratorId: string,
    date: string | undefined,
  ): Promise<DefaultRegistryResponse[]> {
    let where = {
      collaborator_id: collaboratorId,
    };
    if (date) {
      Object.assign(where, {
        date: {
          equals: new Date(date),
        },
      });
    }
    const registries = await this.prismaService.registry.findMany({
      where,
    });

    return registries;
  }

  findRegistryByDay(
    collaboratorId: string,
    day: string,
  ): Promise<DefaultRegistryResponse> {
    throw new Error('Method not implemented.');
  }

  async list(): Promise<ListRegistriesResponse[]> {
    const registries = await this.prismaService.registry.findMany();

    return registries;
  }

  async create(registry: Registry): Promise<void> {
    await this.prismaService.registry.create({
      data: {
        id: registry.id,
        date: registry.date,
        start: registry.start,
        start_location: registry.start_location,
        end: registry.end,
        end_location: registry.end_location,
        interval_end: registry.interval_end,
        interval_end_location: registry.interval_end_location,
        interval_start: registry.interval_start,
        interval_start_location: registry.interval_start_location,
        collaborator_id: registry.collaborator_id,
      },
    });
  }
}

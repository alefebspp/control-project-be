import { Injectable } from '@nestjs/common';
import { addMonths } from 'date-fns';
import { resetDateTime } from 'src/shared/utils/transformDate';
import { Registry } from 'src/app/entities/registry/registry';
import {
  DefaultRegistryResponse,
  ListRegistriesResponse,
  RegistriesRepository,
} from 'src/app/repositories/registries-repository';
import { PrismaService } from './prisma.service';
import { UpdateRegistryDTO } from 'src/infra/http/dtos/registries/update-registry.dto';

@Injectable()
export class PrismaRegistriesRepository implements RegistriesRepository {
  constructor(private prismaService: PrismaService) {}

  async find(registryId: string): Promise<DefaultRegistryResponse> {
    const registry = await this.prismaService.registry.findUnique({
      where: {
        id: registryId,
      },
    });

    return registry;
  }

  async update(
    registryId: string,
    data: UpdateRegistryDTO,
  ): Promise<DefaultRegistryResponse> {
    const registry = await this.prismaService.registry.update({
      where: {
        id: registryId,
      },
      data: {
        ...data,
      },
    });

    return registry;
  }

  async findCollaboratorRegistries(
    collaboratorId: string,
    date: string | undefined,
    period: string | undefined,
  ): Promise<DefaultRegistryResponse[]> {
    let where = {
      collaborator_id: collaboratorId,
    };

    if (period) {
      const periodDate = resetDateTime(new Date(period));
      const nextMonth = addMonths(periodDate, 1);
      Object.assign(where, {
        date: {
          gte: periodDate,
          lt: nextMonth,
        },
      });
    }

    if (date) {
      Object.assign(where, {
        date: {
          equals: new Date(date),
        },
      });
    }
    const registries = await this.prismaService.registry.findMany({
      where,
      orderBy: {
        date: 'asc',
      },
    });

    return registries;
  }

  async list(company_id: string): Promise<ListRegistriesResponse[]> {
    const registries = await this.prismaService.registry.findMany({
      where: {
        company_id,
      },
      orderBy: {
        date: 'asc',
      },
      include: {
        collaborator: true,
      },
    });

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
        company_id: registry.company_id,
      },
    });
  }
}

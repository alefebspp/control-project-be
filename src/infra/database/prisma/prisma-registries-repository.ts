import { Injectable } from '@nestjs/common';
import { addMonths } from 'date-fns';
import { resetDateTime } from 'src/shared/utils/transformDate';
import { Registry } from 'src/app/entities/registry/registry';
import {
  RegistryResponse,
  ListRegistriesParams,
  ListRegistriesResponse,
  RegistriesRepository,
} from 'src/app/repositories/registries-repository';
import { PrismaService } from './prisma.service';
import { UpdateRegistryDTO } from '@app/dtos/registry.dtos';

@Injectable()
export class PrismaRegistriesRepository implements RegistriesRepository {
  constructor(private prismaService: PrismaService) {}

  async find(registryId: string): Promise<RegistryResponse> {
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
  ): Promise<RegistryResponse> {
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
    collaborator_id: string,
    date: string | undefined,
    period: string | undefined,
  ): Promise<RegistryResponse[]> {
    let where = {
      collaborator_id,
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

  async list({
    company_id,
    collaborator_name,
    period,
    skip,
  }: ListRegistriesParams): Promise<ListRegistriesResponse> {
    let where = {};

    Object.assign(where, {
      company_id,
    });

    if (collaborator_name) {
      Object.assign(where, {
        collaborator: {
          name: {
            startsWith: collaborator_name,
            mode: 'insensitive',
          },
        },
      });
    }

    if (period) {
      const periodDate = new Date(period);
      const nextMonth = addMonths(periodDate, 1);
      Object.assign(where, {
        date: {
          gte: periodDate,
          lt: nextMonth,
        },
      });
    }

    const paginationParams = {};
    if (skip) {
      Object.assign(paginationParams, {
        take: 10,
        skip: Number(skip),
      });
    }
    const registriesCount = await this.prismaService.registry.count({
      where,
    });

    const registries = await this.prismaService.registry.findMany({
      ...paginationParams,
      where,
      orderBy: {
        date: 'asc',
      },
      include: {
        collaborator: true,
      },
    });

    if (skip) {
      return {
        registries,
        count: registriesCount,
      };
    }

    return {
      registries,
    };
  }

  async create(registry: Registry): Promise<RegistryResponse> {
    const createdRegistry = await this.prismaService.registry.create({
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

    return createdRegistry;
  }
}

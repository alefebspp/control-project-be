import { Collaborator } from 'src/app/entities/collaborator/collaborator';
import {
  CollaboratorsRepository,
  CollaboratorInfo,
} from 'src/app/repositories/collaborators-repository';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UpdateCollaboratorDTO } from '@app/dtos/collaborator.dtos';

@Injectable()
export class PrismaCollaboratorsRepository implements CollaboratorsRepository {
  constructor(private prismaService: PrismaService) {}

  async update(
    data: UpdateCollaboratorDTO,
    collaboratorId: string,
  ): Promise<CollaboratorInfo> {
    const updatedCollaborator = await this.prismaService.collaborator.update({
      where: {
        id: collaboratorId,
      },
      data: {
        name: data.name,
        surname: data.surname,
        email: data.email,
        shift_start: data.shift_start,
        shift_end: data.shift_end,
        interval_start: data.interval_start,
        interval_end: data.interval_end,
      },
    });

    delete updatedCollaborator.password;

    return updatedCollaborator;
  }

  async delete(collaboratorId: string): Promise<void> {
    await this.prismaService.collaborator.delete({
      where: {
        id: collaboratorId,
      },
    });
  }

  async list(): Promise<CollaboratorInfo[]> {
    const collaborators = await this.prismaService.collaborator.findMany();

    return collaborators;
  }
  async changeAvatar(fileUrl: string, collaborator_id: string): Promise<void> {
    const newCollaboratorAvatar = await this.prismaService.collaborator.update({
      where: {
        id: collaborator_id,
      },
      data: {
        avatar: fileUrl,
      },
    });
  }

  async findByEmail(email: string): Promise<CollaboratorInfo> {
    const collaborator = await this.prismaService.collaborator.findUnique({
      where: {
        email,
      },
    });
    return collaborator;
  }

  async find(collaboratorId: string): Promise<CollaboratorInfo> {
    const collaborator = await this.prismaService.collaborator.findUnique({
      where: {
        id: collaboratorId,
      },
    });

    delete collaborator.password;

    return collaborator;
  }

  async create(collaborator: Collaborator): Promise<void> {
    const hashedPassword = await hash(collaborator.password, 8);

    await this.prismaService.collaborator.create({
      data: {
        id: collaborator.id,
        name: collaborator.name,
        surname: collaborator.surname,
        email: collaborator.email,
        password: hashedPassword,
        shift_start: collaborator.shift_start,
        shift_end: collaborator.shift_end,
        interval_start: collaborator.interval_start,
        interval_end: collaborator.interval_end,
      },
    });
  }
}

import { Collaborator } from 'src/app/entities/collaborator/collaborator';
import {
  CollaboratorsRepository,
  CollaboratorInfo,
} from 'src/app/repositories/collaborators-repository';
import { PrismaService } from './prisma.service';
import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';

@Injectable()
export class PrismaCollaboratorsRepository implements CollaboratorsRepository {
  constructor(private prismaService: PrismaService) {}

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
        shift_start: collaborator.shiftStart,
        shift_end: collaborator.shiftEnd,
      },
    });
  }
}

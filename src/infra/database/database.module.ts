import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RegistriesRepository } from 'src/app/repositories/registries-repository';
import { PrismaRegistriesRepository } from './prisma/prisma-registries-repository';
import { CollaboratorsRepository } from 'src/app/repositories/collaborators-repository';
import { PrismaCollaboratorsRepository } from './prisma/prisma-collaborators-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: RegistriesRepository,
      useClass: PrismaRegistriesRepository,
    },
    {
      provide: CollaboratorsRepository,
      useClass: PrismaCollaboratorsRepository,
    },
  ],
  exports: [RegistriesRepository, CollaboratorsRepository],
})
export class DatabaseModule {}

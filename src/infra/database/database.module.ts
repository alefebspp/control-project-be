import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RegistriesRepository } from 'src/app/repositories/registries-repository';
import { PrismaRegistriesRepository } from './prisma/prisma-registries-repository';
import { CollaboratorsRepository } from 'src/app/repositories/collaborators-repository';
import { PrismaCollaboratorsRepository } from './prisma/prisma-collaborators-repository';
import { AdjustmentsRepository } from '@app/repositories/adjustments-repository';
import { PrismaAdjustmentsRepository } from './prisma/prisma-adjustments-repository';

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
    {
      provide: AdjustmentsRepository,
      useClass: PrismaAdjustmentsRepository,
    },
  ],
  exports: [
    RegistriesRepository,
    CollaboratorsRepository,
    AdjustmentsRepository,
    PrismaService,
  ],
})
export class DatabaseModule {}

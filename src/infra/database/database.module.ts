import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RegistriesRepository } from 'src/app/repositories/registries-repository';
import { PrismaRegistriesRepository } from './prisma/prisma-registries-repository';
import { CollaboratorsRepository } from 'src/app/repositories/collaborators-repository';
import { PrismaCollaboratorsRepository } from './prisma/prisma-collaborators-repository';
import { AdjustmentsRepository } from '@app/repositories/adjustments-repository';
import { PrismaAdjustmentsRepository } from './prisma/prisma-adjustments-repository';
import { CompaniesRepository } from '@app/repositories/companies-repository';
import { PrismaCompaniesRepository } from './prisma/prisma-companies-repository';

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
    {
      provide: CompaniesRepository,
      useClass: PrismaCompaniesRepository,
    },
  ],
  exports: [
    RegistriesRepository,
    CollaboratorsRepository,
    AdjustmentsRepository,
    CompaniesRepository,
    PrismaService,
  ],
})
export class DatabaseModule {}

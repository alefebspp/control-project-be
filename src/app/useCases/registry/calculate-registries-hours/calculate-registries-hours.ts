import { Injectable, NotFoundException } from '@nestjs/common';
import { CollaboratorsRepository } from '@app/repositories/collaborators-repository';
import { RegistriesRepository } from '@app/repositories/registries-repository';
import {
  subtractRegistries,
  sumRegistries,
} from 'src/shared/utils/registryOperations';
import { monthMap } from 'src/shared/utils/maps';

@Injectable()
export class CalculateRegistriesHours {
  constructor(
    private registriesRepository: RegistriesRepository,
    private collaboratorRepository: CollaboratorsRepository,
  ) {}
  async execute(collaborator_id: string, period: string) {
    const periodMonth = period.split('-')[1];
    let aditionalTotalHours: string = '00:00';
    let pendingTotalHours: string = '00:00';

    const collaborator = await this.collaboratorRepository.find(
      collaborator_id,
    );

    if (!collaborator) {
      throw new NotFoundException('Could not find collaborator', {
        cause: new Error(),
        description: 'Does not exists a collaborator with the informed id',
      });
    }

    const { shift_end, shift_start } = collaborator;

    const collaboratorDayTotalTime = subtractRegistries(shift_end, shift_start);

    const registries =
      await this.registriesRepository.findCollaboratorRegistries(
        collaborator_id,
        undefined,
        period,
      );

    registries.forEach((registry) => {
      const { end, start } = registry;

      if (start != null && end != null) {
        const registryTotalTime = subtractRegistries(end, start);

        const registryHours = parseInt(registryTotalTime.split(':')[0]);

        const collaboratorTotalHours = parseInt(
          collaboratorDayTotalTime.split(':')[0],
        );

        if (registryHours > collaboratorTotalHours) {
          aditionalTotalHours = sumRegistries(
            aditionalTotalHours,
            subtractRegistries(registryTotalTime, collaboratorDayTotalTime),
          );
        }
        if (registryHours < collaboratorTotalHours) {
          pendingTotalHours = sumRegistries(
            pendingTotalHours,
            subtractRegistries(collaboratorDayTotalTime, registryTotalTime),
          );
        }
        if (registryHours == collaboratorTotalHours) {
          const registryMinutes = parseInt(registryTotalTime.split(':')[1]);
          const collaboratorTotalMinutes = parseInt(
            collaboratorDayTotalTime.split(':')[1],
          );
          if (registryMinutes > collaboratorTotalMinutes) {
            aditionalTotalHours = sumRegistries(
              aditionalTotalHours,
              subtractRegistries(registryTotalTime, collaboratorDayTotalTime),
            );
          }
        }
      }
    });

    return {
      aditionalHours: {
        value: Number(aditionalTotalHours.replace(':', '.')),
        label: aditionalTotalHours,
      },
      pendingHours: {
        value: Number(pendingTotalHours.replace(':', '.')),
        label: pendingTotalHours,
      },
      monthLabel: monthMap[periodMonth],
    };
  }
}

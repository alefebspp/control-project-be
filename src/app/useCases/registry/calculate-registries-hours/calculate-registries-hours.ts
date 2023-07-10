import { CollaboratorsRepository } from '@app/repositories/collaborators-repository';
import { RegistriesRepository } from '@app/repositories/registries-repository';
import {
  subtractRegistries,
  sumRegistries,
} from '@app/utils/registryOperations';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculateRegistriesHours {
  constructor(
    private registriesRepository: RegistriesRepository,
    private collaboratorRepository: CollaboratorsRepository,
  ) {}
  async execute(collaborator_id: string, period: string) {
    let aditionalTotalHours: string = '00:00';
    let pendingTotalHours: string = '00:00';

    const { shift_end, shift_start } = await this.collaboratorRepository.find(
      collaborator_id,
    );

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
      aditionalTotalHours,
      pendingTotalHours,
    };
  }
}

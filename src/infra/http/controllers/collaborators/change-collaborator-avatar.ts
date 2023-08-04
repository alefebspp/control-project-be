import { ChangeCollaboratorAvatar } from '@app/useCases/collaborator/change-collaborator-avatar/change-collaborator-avatar';
import {
  Controller,
  Patch,
  UseInterceptors,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudStorageService } from 'src/services/cloud-storage.service';

@Controller('collaborator')
export class ChangeCollaboratorAvatarController {
  constructor(
    private changeCollaboratorAvatar: ChangeCollaboratorAvatar,
    private cloudStorageService: CloudStorageService,
  ) {}
  @Patch('avatar/:collaboratorId')
  @UseInterceptors(FileInterceptor('file'))
  async changeAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('collaboratorId') collaboratorId: string,
  ) {
    const response = await this.cloudStorageService.uploadFile(file);

    await this.changeCollaboratorAvatar.execute(
      response.publicUrl,
      collaboratorId,
    );
  }
}

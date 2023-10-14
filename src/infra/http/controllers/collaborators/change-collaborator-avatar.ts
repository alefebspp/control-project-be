import { ChangeCollaboratorAvatar } from '@app/useCases/collaborator/change-collaborator-avatar/change-collaborator-avatar';
import {
  Controller,
  Patch,
  UseInterceptors,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('collaborator')
export class ChangeCollaboratorAvatarController {
  constructor(private changeCollaboratorAvatar: ChangeCollaboratorAvatar) {}
  @Patch('avatar/:collaboratorId')
  @UseInterceptors(FileInterceptor('file'))
  async changeAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('collaboratorId') collaboratorId: string,
  ) {
    await this.changeCollaboratorAvatar.execute(file, collaboratorId);
  }
}

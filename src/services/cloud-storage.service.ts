import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudStorageService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadFile(uploadedFile: Express.Multer.File, collaborator_id: string) {
    try {
      const public_id = collaborator_id;
      const b64 = Buffer.from(uploadedFile.buffer).toString('base64');
      let dataURI = 'data:' + uploadedFile.mimetype + ';base64,' + b64;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'collaborators_avatar',
        public_id,
        resource_type: 'auto',
      });

      return {
        publicUrl: result.url,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error?.message);
    }
  }

  async findFile(publicId: string): Promise<boolean> {
    try {
      const result = await cloudinary.search
        .expression(`public_id: collaborators_avatar/${publicId}`)
        .max_results(1)
        .execute();

      return result.resources.length > 0;
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async removeFile(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(`collaborators_avatar/${publicId}`);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}

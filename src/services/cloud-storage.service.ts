import { Bucket, Storage } from '@google-cloud/storage';
import { randomUUID } from 'node:crypto';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CloudStorageService {
  private bucket: Bucket;
  private storage: Storage;

  constructor() {
    this.storage = new Storage({
      projectId: process.env.GCS_PROJECTID,
      credentials: {
        type: process.env.GCS_TYPE,
        private_key: process.env.GCS_PRIVATE_KEY,
        client_email: process.env.GCS_CLIENT_EMAIL,
        client_id: process.env.GCS_CLIENT_ID,
      },
    });
    this.bucket = this.storage.bucket(process.env.GCS_BUCKET_NAME);
  }

  async uploadFile(uploadedFile: Express.Multer.File): Promise<any> {
    const fileName = `${randomUUID()}-${uploadedFile.originalname}`;

    const file = this.bucket.file(fileName);
    try {
      await file.save(uploadedFile.buffer, {
        contentType: uploadedFile.mimetype,
      });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
    return {
      ...file.metadata,
      publicUrl: `https://storage.googleapis.com/${this.bucket.name}/${file.name}`,
    };
  }

  async findFile(fileName: string): Promise<boolean> {
    const file = this.bucket.file(fileName);

    try {
      const [fileExists] = await file.exists();

      return fileExists;
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async removeFile(fileName: string): Promise<void> {
    const file = this.bucket.file(fileName);

    try {
      await file.delete();
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import path from "path";

import { r2 } from "../config/r2";
import { env } from "../config/env";

export class StorageService {
  async upload(
    file: Express.Multer.File,
    folder: string
  ) {
    const extension = path.extname(file.originalname);

    const fileName = `${randomUUID()}${extension}`;

    const key = `${folder}/${fileName}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: env.r2Bucket,
        Key: key,

        Body: file.buffer,

        ContentType: file.mimetype,
      })
    );

    return {
      key,

      fileName,

      originalName: file.originalname,

      url: `${env.r2PublicUrl}/${key}`,
    };
  }
}

export const storage = new StorageService();
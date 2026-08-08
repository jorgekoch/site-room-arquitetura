import {
  DeleteObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { randomUUID } from "crypto";
import path from "path";

import { r2 } from "../config/r2";
import { env } from "../config/env";

export interface SignedUploadOptions {
  folder: string;
  fileName: string;
  fileType: string;
}

export class StorageService {
  /**
   * Upload tradicional.
   * Utilizado quando o backend recebe o arquivo via Multer.
   */
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

  /**
   * Gera uma Signed URL.
   * Utilizado quando o frontend envia
   * o arquivo diretamente para o Cloudflare R2.
   */
  async generateSignedUrl({
    folder,
    fileName,
    fileType,
  }: SignedUploadOptions) {
    const safeFileName = fileName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "");

    const storageKey = `${folder}/${Date.now()}-${safeFileName}`;

    const command = new PutObjectCommand({
      Bucket: env.r2Bucket,
      Key: storageKey,

      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(
      r2,
      command,
      {
        expiresIn: 600,
      }
    );

    return {
      uploadUrl,

      storageKey,

      fileUrl: `${env.r2PublicUrl}/${storageKey}`,
    };
  }

  /**
   * Remove um único arquivo do bucket.
   */
  async delete(storageKey: string) {
    await r2.send(
      new DeleteObjectCommand({
        Bucket: env.r2Bucket,
        Key: storageKey,
      })
    );
  }

  /**
   * Remove vários arquivos do bucket.
   */
  async deleteMany(
    storageKeys: string[]
  ) {
    await Promise.all(
      storageKeys.map((key) =>
        this.delete(key)
      )
    );
  }

  /**
   * Retorna a URL pública de um arquivo.
   */
  getPublicUrl(storageKey: string) {
    return `${env.r2PublicUrl}/${storageKey}`;
  }
}

export const storage = new StorageService();
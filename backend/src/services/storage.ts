import { AppError } from "../utils/AppError";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
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

export interface SignedUploadResult {
  uploadUrl: string;
  storageKey: string;
  fileUrl: string;
}

export interface PrivateSignedUploadResult {
  uploadUrl: string;
  storageKey: string;
}

export interface UploadedFileResult {
  key: string;
  fileName: string;
  originalName: string;
  url: string;
}

export class StorageService {
  async upload(
    file: Express.Multer.File,
    folder: string
  ): Promise<UploadedFileResult> {
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
      url: this.getPublicUrl(key),
    };
  }

  async generateSignedUrl({
    folder,
    fileName,
    fileType,
  }: SignedUploadOptions): Promise<SignedUploadResult> {
    const safeFileName = fileName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "");

    const finalFileName = safeFileName || `${randomUUID()}`;
    const storageKey = `${folder}/${Date.now()}-${finalFileName}`;

    const command = new PutObjectCommand({
      Bucket: env.r2Bucket,
      Key: storageKey,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(r2, command, {
      expiresIn: 600,
    });

    return {
      uploadUrl,
      storageKey,
      fileUrl: this.getPublicUrl(storageKey),
    };
  }

  async generatePrivateSignedUploadUrl({
    folder,
    fileName,
    fileType,
  }: SignedUploadOptions): Promise<PrivateSignedUploadResult> {
    const safeFileName = fileName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "");

    const extension = path.extname(safeFileName);
    const storageKey = `${folder}/${randomUUID()}${extension}`;

    const command = new PutObjectCommand({
      Bucket: env.r2PrivateBucket,
      Key: storageKey,
      ContentType: fileType,
    });

    return {
      uploadUrl: await getSignedUrl(r2, command, { expiresIn: 600 }),
      storageKey,
    };
  }

  async validateObject(
    storageKey: string,
    options: {
      maxSize: number;
      allowedContentTypes: string[];
    }
  ) {
    const metadata = await this.getObjectMetadata(storageKey);

    if (!options.allowedContentTypes.includes(metadata.contentType ?? "")) {
      throw new AppError("Tipo de arquivo não permitido.", 400);
    }

    if (metadata.contentLength > options.maxSize) {
      throw new AppError(
        "O arquivo excede o tamanho máximo permitido.",
        400
      );
    }

    return metadata;
  }

  async getObjectMetadata(storageKey: string) {
    try {
      const result = await r2.send(
        new HeadObjectCommand({
          Bucket: env.r2Bucket,
          Key: storageKey,
        })
      );

      return {
        contentLength: result.ContentLength ?? 0,
        contentType: result.ContentType ?? null,
      };
    } catch (error) {
      console.error("Erro ao consultar objeto no R2:", error);
      throw new Error("Arquivo não encontrado no armazenamento.");
    }
  }

  async validatePrivateObject(
    storageKey: string,
    options: { maxSize: number; allowedContentTypes: string[] }
  ) {
    const metadata = await this.getPrivateObjectMetadata(storageKey);

    if (!options.allowedContentTypes.includes(metadata.contentType ?? "")) {
      throw new AppError("Tipo de arquivo não permitido.", 400);
    }

    if (
      metadata.contentLength <= 0 ||
      metadata.contentLength > options.maxSize
    ) {
      throw new AppError(
        "O arquivo excede o tamanho permitido ou está vazio.",
        400
      );
    }

    return metadata;
  }

  async getPrivateObjectMetadata(storageKey: string) {
    try {
      const result = await r2.send(
        new HeadObjectCommand({
          Bucket: env.r2PrivateBucket,
          Key: storageKey,
        })
      );

      return {
        contentLength: result.ContentLength ?? 0,
        contentType: result.ContentType ?? null,
      };
    } catch {
      throw new AppError(
        "Arquivo não encontrado no armazenamento privado.",
        400
      );
    }
  }

  async getPrivateDownloadUrl(storageKey: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: env.r2PrivateBucket,
      Key: storageKey,
    });

    return getSignedUrl(r2, command, { expiresIn: 300 });
  }

  /** Remove um arquivo do bucket público. */
  async delete(storageKey: string): Promise<void> {
    await r2.send(
      new DeleteObjectCommand({
        Bucket: env.r2Bucket,
        Key: storageKey,
      })
    );
  }

  /** Remove um arquivo do bucket privado. */
  async deletePrivate(storageKey: string): Promise<void> {
    await r2.send(
      new DeleteObjectCommand({
        Bucket: env.r2PrivateBucket,
        Key: storageKey,
      })
    );
  }

  async deleteMany(storageKeys: string[]): Promise<void> {
    const uniqueStorageKeys = [
      ...new Set(storageKeys.filter((key) => Boolean(key?.trim()))),
    ];

    if (!uniqueStorageKeys.length) {
      return;
    }

    const results = await Promise.allSettled(
      uniqueStorageKeys.map((key) => this.delete(key))
    );

    const failedKeys = results
      .map((result, index) => ({ result, key: uniqueStorageKeys[index] }))
      .filter(({ result }) => result.status === "rejected")
      .map(({ key }) => key);

    if (failedKeys.length > 0) {
      console.error("[StorageService] Falha ao remover arquivos do R2:", {
        failedKeys,
        total: uniqueStorageKeys.length,
        successful: uniqueStorageKeys.length - failedKeys.length,
      });

      throw new Error(
        `Falha ao remover ${failedKeys.length} arquivo(s) do armazenamento.`
      );
    }
  }

  async deletePrivateMany(storageKeys: string[]): Promise<void> {
    const uniqueStorageKeys = [
      ...new Set(storageKeys.filter((key) => Boolean(key?.trim()))),
    ];

    if (!uniqueStorageKeys.length) {
      return;
    }

    const results = await Promise.allSettled(
      uniqueStorageKeys.map((key) => this.deletePrivate(key))
    );

    const failedKeys = results
      .map((result, index) => ({ result, key: uniqueStorageKeys[index] }))
      .filter(({ result }) => result.status === "rejected")
      .map(({ key }) => key);

    if (failedKeys.length > 0) {
      console.error(
        "[StorageService] Falha ao remover arquivos privados do R2:",
        {
          failedKeys,
          total: uniqueStorageKeys.length,
          successful: uniqueStorageKeys.length - failedKeys.length,
        }
      );

      throw new Error(
        `Falha ao remover ${failedKeys.length} arquivo(s) privados do armazenamento.`
      );
    }
  }

  async listObjects(prefix: string) {
    const objects: {
      key: string;
      size: number;
      lastModified: Date | null;
    }[] = [];

    let continuationToken: string | undefined;

    do {
      const result = await r2.send(
        new ListObjectsV2Command({
          Bucket: env.r2Bucket,
          Prefix: prefix,
          ContinuationToken: continuationToken,
        })
      );

      for (const object of result.Contents ?? []) {
        if (!object.Key) {
          continue;
        }

        objects.push({
          key: object.Key,
          size: object.Size ?? 0,
          lastModified: object.LastModified ?? null,
        });
      }

      continuationToken = result.IsTruncated
        ? result.NextContinuationToken
        : undefined;
    } while (continuationToken);

    return objects;
  }

  getPublicUrl(storageKey: string): string {
    return `${env.r2PublicUrl.replace(/\/$/, "")}/${storageKey}`;
  }
}

export const storage = new StorageService();

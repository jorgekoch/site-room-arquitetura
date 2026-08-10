import { AppError } from "../utils/AppError";
import {
  DeleteObjectCommand,
  HeadObjectCommand,
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

export interface UploadedFileResult {
  key: string;
  fileName: string;
  originalName: string;
  url: string;
}

export class StorageService {
  /**
   * Upload tradicional.
   *
   * Utilizado quando o backend
   * recebe o arquivo via Multer.
   */
  async upload(
    file: Express.Multer.File,
    folder: string
  ): Promise<UploadedFileResult> {
    const extension = path.extname(
      file.originalname
    );

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

      originalName:
        file.originalname,

      url: this.getPublicUrl(key),
    };
  }

  /**
   * Gera uma URL assinada para upload direto.
   *
   * O frontend utiliza a URL retornada
   * para enviar o arquivo diretamente
   * para o Cloudflare R2.
   */
  async generateSignedUrl({
    folder,
    fileName,
    fileType,
  }: SignedUploadOptions): Promise<SignedUploadResult> {
    const safeFileName =
      fileName
        .normalize("NFD")
        .replace(
          /[\u0300-\u036f]/g,
          ""
        )
        .replace(/\s+/g, "-")
        .replace(
          /[^a-zA-Z0-9._-]/g,
          ""
        );

    const finalFileName =
      safeFileName ||
      `${randomUUID()}`;

    const storageKey =
      `${folder}/${Date.now()}-${finalFileName}`;

    const command =
      new PutObjectCommand({
        Bucket: env.r2Bucket,

        Key: storageKey,

        ContentType: fileType,
      });

    const uploadUrl =
      await getSignedUrl(
        r2,
        command,
        {
          expiresIn: 600,
        }
      );

    return {
      uploadUrl,

      storageKey,

      fileUrl:
        this.getPublicUrl(
          storageKey
        ),
    };
  }

  async validateObject(
    storageKey: string,
    options: {
      maxSize: number;
      allowedContentTypes: string[];
    }
  ) {
    const metadata =
      await this.getObjectMetadata(
        storageKey
      );

    if (
      !options.allowedContentTypes.includes(
        metadata.contentType ?? ""
      )
    ) {
      throw new AppError(
        "Tipo de arquivo não permitido.",
        400
      );
    }

    if (
      metadata.contentLength >
      options.maxSize
    ) {
      throw new AppError(
        "O arquivo excede o tamanho máximo permitido.",
        400
      );
    }

    return metadata;
  }

  async getObjectMetadata(
    storageKey: string
  ) {
    try {
      const result =
        await r2.send(
          new HeadObjectCommand({
            Bucket: env.r2Bucket,
            Key: storageKey,
          })
        );

      return {
        contentLength:
          result.ContentLength ?? 0,

        contentType:
          result.ContentType ?? null,
      };
    } catch (error) {
      console.error(
        "Erro ao consultar objeto no R2:",
        error
      );

      throw new Error(
        "Arquivo não encontrado no armazenamento."
      );
    }
  }

  /**
   * Remove um arquivo do bucket.
   */
  async delete(
    storageKey: string
  ): Promise<void> {
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
  ): Promise<void> {
    const uniqueStorageKeys = [
      ...new Set(
        storageKeys.filter(
          (key) => Boolean(key?.trim())
        )
      ),
    ];

    if (!uniqueStorageKeys.length) {
      return;
    }

    const results =
      await Promise.allSettled(
        uniqueStorageKeys.map(
          (key) => this.delete(key)
        )
      );

    const failedKeys =
      results
        .map((result, index) => ({
          result,
          key: uniqueStorageKeys[index],
        }))
        .filter(
          ({ result }) =>
            result.status === "rejected"
        )
        .map(
          ({ key }) => key
        );

    if (failedKeys.length > 0) {
      console.error(
        "[StorageService] Falha ao remover arquivos do R2:",
        {
          failedKeys,
          total: uniqueStorageKeys.length,
          successful:
            uniqueStorageKeys.length -
            failedKeys.length,
        }
      );

      throw new Error(
        `Falha ao remover ${failedKeys.length} arquivo(s) do armazenamento.`
      );
    }
  }

  /**
   * Retorna a URL pública
   * de um arquivo armazenado.
   */
  getPublicUrl(
    storageKey: string
  ): string {
    return `${env.r2PublicUrl.replace(
      /\/$/,
      ""
    )}/${storageKey}`;
  }
}

export const storage =
  new StorageService();
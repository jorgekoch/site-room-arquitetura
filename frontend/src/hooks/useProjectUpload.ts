import { useState } from "react";

import { getProjectUploadUrl } from "../lib/projects";

const MAX_FILE_SIZE = 15 * 1024 * 1024;
const UPLOAD_TIMEOUT = 10 * 60 * 1000;

export function useProjectUpload() {
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    if (!file) {
      throw new Error("Nenhum arquivo selecionado.");
    }

    if (!file.type.startsWith("image/")) {
      throw new Error(
        `O arquivo "${file.name}" não é uma imagem válida.`
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error(
        `A imagem "${file.name}" é muito grande. O limite é de 15 MB.`
      );
    }

    setUploading(true);

    try {
      const signed = await getProjectUploadUrl(
        file.name,
        file.type
      );

      const controller = new AbortController();

      const timeout = window.setTimeout(() => {
        controller.abort();
      }, UPLOAD_TIMEOUT);

      try {
        const response = await fetch(
          signed.uploadUrl,
          {
            method: "PUT",

            headers: {
              "Content-Type": file.type,
            },

            body: file,

            signal: controller.signal,
          }
        );

        if (!response.ok) {
          let message =
            `Erro ao enviar "${file.name}".`;

          try {
            const responseText =
              await response.text();

            if (responseText) {
              message += ` ${responseText}`;
            }
          } catch {
            // Ignora erro ao ler a resposta.
          }

          throw new Error(message);
        }

        return {
          imageUrl: signed.fileUrl,
          storageKey: signed.storageKey,
        };
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          throw new Error(
            `O upload da imagem "${file.name}" excedeu o tempo limite.`
          );
        }

        throw error;
      } finally {
        window.clearTimeout(timeout);
      }
    } finally {
      setUploading(false);
    }
  }

  return {
    upload,
    uploading,
  };
}
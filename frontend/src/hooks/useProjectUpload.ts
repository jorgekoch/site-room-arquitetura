import { useEffect, useState } from "react";

import { getProjectUploadUrl } from "../lib/projects";
import { getSiteSettings } from "../lib/settings";

const UPLOAD_TIMEOUT =
  10 * 60 * 1000;

export function useProjectUpload() {
  const [
    uploading,
    setUploading,
  ] = useState(false);

  const [
    maxFileSizeMb,
    setMaxFileSizeMb,
  ] = useState(10);

  useEffect(() => {
    let cancelled = false;

    async function loadSettings() {
      try {
        const settings =
          await getSiteSettings();

        if (!cancelled) {
          setMaxFileSizeMb(
            settings.maxProjectImageSizeMb
          );
        }
      } catch (error) {
        console.error(
          "Erro ao carregar configurações do site:",
          error
        );
      }
    }

    loadSettings();

    return () => {
      cancelled = true;
    };
  }, []);

  async function upload(
    file: File
  ) {
    if (!file) {
      throw new Error(
        "Nenhum arquivo selecionado."
      );
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      throw new Error(
        `O arquivo "${file.name}" não é uma imagem válida.`
      );
    }

    const maxFileSize =
      maxFileSizeMb *
      1024 *
      1024;

    if (
      file.size >
      maxFileSize
    ) {
      throw new Error(
        `A imagem "${file.name}" é muito grande. O limite é de ${maxFileSizeMb} MB.`
      );
    }

    setUploading(true);

    try {
      const signed =
        await getProjectUploadUrl(
          file.name,
          file.type
        );

      const controller =
        new AbortController();

      const timeout =
        window.setTimeout(
          () => {
            controller.abort();
          },
          UPLOAD_TIMEOUT
        );

      try {
        const response =
          await fetch(
            signed.uploadUrl,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  file.type,
              },

              body: file,

              signal:
                controller.signal,
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

          throw new Error(
            message
          );
        }

        return {
          imageUrl:
            signed.fileUrl,

          storageKey:
            signed.storageKey,
        };
      } catch (error) {
        if (
          error instanceof
            DOMException &&
          error.name ===
            "AbortError"
        ) {
          throw new Error(
            `O upload da imagem "${file.name}" excedeu o tempo limite.`
          );
        }

        throw error;
      } finally {
        window.clearTimeout(
          timeout
        );
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
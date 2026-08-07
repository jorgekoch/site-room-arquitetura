import { useState } from "react";

import { getProjectUploadUrl } from "../lib/projects";

export function useProjectUpload() {
  const [uploading, setUploading] =
    useState(false);

  async function upload(file: File) {
  setUploading(true);

  try {
    const signed =
      await getProjectUploadUrl(
        file.name,
        file.type
      );

    const uploadResponse = await fetch(
      signed.uploadUrl,
      {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      }
    );

    if (!uploadResponse.ok) {
      throw new Error(
        "Erro ao enviar imagem."
      );
    }

    return signed;
  } finally {
    setUploading(false);
  }
}

  return {
    upload,

    uploading,
  };
}
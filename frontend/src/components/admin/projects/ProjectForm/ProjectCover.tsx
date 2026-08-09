import { ChangeEvent } from "react";

import * as S from "./styles";

interface Props {
  featuredImage?: string | null;

  uploading: boolean;

  onUpload(
    event: ChangeEvent<HTMLInputElement>
  ): void;

  onRemove(): void;
}

export function ProjectCover({
  featuredImage,
  uploading,
  onUpload,
  onRemove,
}: Props) {
  return (
    <S.Group>
      Imagem de capa

      <input
        type="file"
        accept="image/*"
        onChange={onUpload}
        disabled={uploading}
      />

      {uploading && (
        <small>
          Enviando imagem...
        </small>
      )}

      {featuredImage && (
        <>
          <img
            src={featuredImage}
            alt="Imagem de capa"
            style={{
              width: "260px",
              marginTop: "16px",
              borderRadius: "12px",
            }}
          />

          <button
            type="button"
            onClick={onRemove}
            disabled={uploading}
            style={{
              display: "block",
              marginTop: "12px",
            }}
          >
            Remover imagem de capa
          </button>
        </>
      )}
    </S.Group>
  );
}
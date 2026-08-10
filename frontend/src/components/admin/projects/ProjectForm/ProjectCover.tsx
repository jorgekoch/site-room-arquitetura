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
        accept=".jpg,.jpeg,.png,.webp,.avif"
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

          <S.CoverRemoveButton
            type="button"
            onClick={onRemove}
            disabled={uploading}
            aria-label="Remover imagem de capa"
          >
            Remover imagem de capa
          </S.CoverRemoveButton>
        </>
      )}
    </S.Group>
  );
}
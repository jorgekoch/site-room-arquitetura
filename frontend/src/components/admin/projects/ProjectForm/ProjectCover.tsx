import { ChangeEvent } from "react";

import * as S from "./styles";

interface Props {
  featuredImage?: string | null;

  uploading: boolean;

  onUpload(
    event: ChangeEvent<HTMLInputElement>
  ): void;
}

export function ProjectCover({
  featuredImage,
  uploading,
  onUpload,
}: Props) {
  return (
    <S.Group>
      <label>Imagem de capa</label>

      <input
        type="file"
        accept="image/*"
        onChange={onUpload}
      />

      {uploading && (
        <small>Enviando imagem...</small>
      )}

      {featuredImage && (
        <img
          src={featuredImage}
          alt="Imagem de capa"
          style={{
            width: "260px",
            marginTop: "16px",
            borderRadius: "12px",
          }}
        />
      )}
    </S.Group>
  );
}
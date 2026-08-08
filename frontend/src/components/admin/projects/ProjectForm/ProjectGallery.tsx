import { ChangeEvent } from "react";

import { ProjectImage } from "../../../../types/project";

import * as S from "./styles";

interface Props {
  images: ProjectImage[];

  uploading: boolean;

  onUpload(
    event: ChangeEvent<HTMLInputElement>
  ): void;

  onRemove(index: number): void;
}

export function ProjectGallery({
  images,
  uploading,
  onUpload,
  onRemove,
}: Props) {
  return (
    <>
      <S.Group>
        <label>Galeria</label>

        <input
          multiple
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          onChange={onUpload}
          disabled={uploading}
        />

        {uploading && (
          <small>
            Enviando imagens, aguarde...
          </small>
        )}
      </S.Group>

      {images.length > 0 && (
        <S.Gallery>
          {images.map((image, index) => (
            <S.ImageCard
              key={
                image.storageKey ||
                `${image.imageUrl}-${index}`
              }
            >
              <img
                src={image.imageUrl}
                alt={image.alt ?? ""}
              />

              <button
                type="button"
                onClick={() =>
                  onRemove(index)
                }
                disabled={uploading}
              >
                Remover
              </button>
            </S.ImageCard>
          ))}
        </S.Gallery>
      )}
    </>
  );
}
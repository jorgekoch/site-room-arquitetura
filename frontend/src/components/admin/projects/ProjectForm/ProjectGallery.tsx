import { ChangeEvent } from "react";

import { ProjectImage } from "../../../../types/project";

import * as S from "./styles";

interface Props {
  images: ProjectImage[];

  uploading: boolean;

  onUpload(
    event: ChangeEvent
  ): void;

  onRemove(index: number): void;

  maxProjectImages: number;

  maxProjectImageSizeMb: number;
}

export function ProjectGallery({
  images,
  uploading,
  onUpload,
  onRemove,
  maxProjectImages,
  maxProjectImageSizeMb,
}: Props) {
  return (
    <>
      <S.Group>
        Galeria

        <input
          id="project-gallery"
          multiple
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.avif"
          onChange={onUpload}
          disabled={
            uploading ||
            images.length >=
              maxProjectImages
          }
        />

        <small>
          Formatos permitidos: JPG, PNG,
          WebP e AVIF. Máximo de{" "}
          {maxProjectImageSizeMb} MB
          por imagem e{" "}
          {maxProjectImages} imagens no
          total.
        </small>

        {uploading && (
          <small>
            Enviando imagens, aguarde...
          </small>
        )}
      </S.Group>

      {images.length > 0 && (
        <S.Gallery>
          {images.map(
            (image, index) => (
              <S.ImageCard
                key={
                  image.storageKey ||
                  `${image.imageUrl}-${index}`
                }
              >
                <img
                  src={
                    image.imageUrl
                  }
                  alt={
                    image.alt ||
                    `Imagem ${index + 1} do projeto`
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    onRemove(index)
                  }
                  disabled={
                    uploading
                  }
                  aria-label={`Remover imagem ${index + 1} da galeria`}
                >
                  Remover
                </button>
              </S.ImageCard>
            )
          )}
        </S.Gallery>
      )}
    </>
  );
}
import {
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import { ProjectFormData } from "../../../../types/project-form";

import * as S from "./styles";

interface Props {
  register: UseFormRegister<ProjectFormData>;

  errors: FieldErrors<ProjectFormData>;

  fieldErrors: Record<
    string,
    string
  >;

  onSlugChange(): void;
}

export function ProjectInfo({
  register,
  errors,
  fieldErrors,
  onSlugChange,
}: Props) {
  const slugRegister =
    register("slug");

  return (
    <>
      <S.Row>
        <S.Group>
          <label>Título</label>

          <input
            {...register("title")}
          />

          {errors.title && (
            <S.FieldError>
              {errors.title.message}
            </S.FieldError>
          )}

          {fieldErrors.title && (
            <S.FieldError>
              {fieldErrors.title}
            </S.FieldError>
          )}
        </S.Group>

        <S.Group>
          <label>Slug</label>

          <input
            {...slugRegister}
            onChange={(event) => {
              slugRegister.onChange(
                event
              );

              onSlugChange();
            }}
          />

          {errors.slug && (
            <S.FieldError>
              {errors.slug.message}
            </S.FieldError>
          )}

          {fieldErrors.slug && (
            <S.FieldError>
              {fieldErrors.slug}
            </S.FieldError>
          )}
        </S.Group>
      </S.Row>

      <S.Row>
        <S.Group>
          <label>Categoria</label>

          <select
            {...register("category")}
          >
            <option value="RESIDENTIAL">
              Residencial
            </option>

            <option value="INTERIORS">
              Interiores
            </option>

            <option value="COMMERCIAL">
              Comercial
            </option>

            <option value="LANDSCAPE">
              Paisagismo
            </option>

            <option value="CONSULTING">
              Consultoria
            </option>

            <option value="OTHER">
              Outro
            </option>
          </select>

          {errors.category && (
            <S.FieldError>
              {errors.category.message}
            </S.FieldError>
          )}
        </S.Group>

        <S.Group>
          <label>Ano</label>

          <input
            type="number"
            {...register("year", {
              valueAsNumber: true,
            })}
          />

          {errors.year && (
            <S.FieldError>
              {errors.year.message}
            </S.FieldError>
          )}
        </S.Group>
      </S.Row>

      <S.Row>
        <S.Group>
          <label>Cidade</label>

          <input
            {...register("city")}
          />
        </S.Group>

        <S.Group>
          <label>Estado</label>

          <input
            {...register("state")}
          />
        </S.Group>
      </S.Row>

      <S.Group>
        <label>Área</label>

        <input
          {...register("area")}
        />
      </S.Group>

      <S.Group>
        <label>Descrição</label>

        <textarea
          rows={4}
          {...register("description")}
        />

        {errors.description && (
          <S.FieldError>
            {
              errors.description
                .message
            }
          </S.FieldError>
        )}

        {fieldErrors.description && (
          <S.FieldError>
            {
              fieldErrors.description
            }
          </S.FieldError>
        )}
      </S.Group>

      <S.Group>
        <label>
          Vídeo do projeto — YouTube
        </label>

        <input
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          {...register("videoUrl")}
        />

        <small>
          Opcional. Cole aqui o
          link do vídeo publicado
          no YouTube.
        </small>
      </S.Group>

      <S.Group>
        <label>Conteúdo</label>

        <textarea
          rows={8}
          {...register("content")}
        />

        {errors.content && (
          <S.FieldError>
            {
              errors.content
                .message
            }
          </S.FieldError>
        )}
      </S.Group>
    </>
  );
}
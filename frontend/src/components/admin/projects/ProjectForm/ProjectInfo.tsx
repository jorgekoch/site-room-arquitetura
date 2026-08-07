import { UseFormRegister } from "react-hook-form";

import { ProjectFormData } from "../../../../types/project-form";

import * as S from "./styles";

interface Props {
  register: UseFormRegister<ProjectFormData>;
}

export function ProjectInfo({
  register,
}: Props) {
  return (
    <>
      <S.Row>
        <S.Group>
          <label>Título</label>

          <input
            {...register("title")}
          />
        </S.Group>

        <S.Group>
          <label>Slug</label>

          <input
            {...register("slug")}
          />
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
        </S.Group>

        <S.Group>
          <label>Ano</label>

          <input
            type="number"
            {...register("year", {
              valueAsNumber: true,
            })}
          />
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
      </S.Group>

      <S.Group>
        <label>Conteúdo</label>

        <textarea
          rows={8}
          {...register("content")}
        />
      </S.Group>
    </>
  );
}
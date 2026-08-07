import { UseFormRegister } from "react-hook-form";

import { ProjectFormData } from "../../../../types/project-form";

import * as S from "./styles";

interface Props {
  register: UseFormRegister<ProjectFormData>;
}

export function ProjectSettings({
  register,
}: Props) {
  return (
    <S.Checks>
      <label>
        <input
          type="checkbox"
          {...register("published")}
        />

        Publicado
      </label>

      <label>
        <input
          type="checkbox"
          {...register("featured")}
        />

        Destaque
      </label>
    </S.Checks>
  );
}
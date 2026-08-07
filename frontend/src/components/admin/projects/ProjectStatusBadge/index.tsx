import * as S from "./styles";

interface Props {
  published: boolean;
}

export function ProjectStatusBadge({
  published,
}: Props) {
  return (
    <S.Badge $published={published}>
      {published
        ? "Publicado"
        : "Rascunho"}
    </S.Badge>
  );
}
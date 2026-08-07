import { Inbox } from "lucide-react";

import * as S from "./styles";

interface Props {
  title: string;
  description: string;
}

export function EmptyState({
  title,
  description,
}: Props) {
  return (
    <S.Container>

      <Inbox size={56} />

      <h3>{title}</h3>

      <p>{description}</p>

    </S.Container>
  );
}
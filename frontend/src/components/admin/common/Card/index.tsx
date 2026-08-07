import type { ReactNode } from "react";

import * as S from "./styles";

interface CardProps {
  children: ReactNode;
  padding?: string;
}

export function Card({
  children,
  padding = "24px",
}: CardProps) {
  return (
    <S.Container
      $padding={padding}
    >
      {children}
    </S.Container>
  );
}
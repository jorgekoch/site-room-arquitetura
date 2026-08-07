import type { ReactNode } from "react";

import * as S from "./styles";

interface ContentGridProps {
  children: ReactNode;
}

export function ContentGrid({
  children,
}: ContentGridProps) {
  return (
    <S.Container>
      {children}
    </S.Container>
  );
}
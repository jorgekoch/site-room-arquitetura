import type { ReactNode } from "react";

import * as S from "./styles";

interface StatsGridProps {
  children: ReactNode;
}

export function StatsGrid({
  children,
}: StatsGridProps) {
  return (
    <S.Container>
      {children}
    </S.Container>
  );
}
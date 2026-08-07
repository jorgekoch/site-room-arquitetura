import type { ReactNode } from "react";

import * as S from "./styles";

interface DataTableProps {
  children: ReactNode;
}

export function DataTable({
  children,
}: DataTableProps) {
  return (
    <S.Container>

      <S.Table>

        {children}

      </S.Table>

    </S.Container>
  );
}
import type { ReactNode } from "react";

import * as S from "./styles";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <S.Container>

      <S.Content>

        <S.Title>
          {title}
        </S.Title>

        {description && (
          <S.Description>
            {description}
          </S.Description>
        )}

      </S.Content>

      {actions && (
        <S.Actions>
          {actions}
        </S.Actions>
      )}

    </S.Container>
  );
}
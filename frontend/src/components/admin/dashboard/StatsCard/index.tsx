import type { LucideIcon } from "lucide-react";

import * as S from "./styles";

interface StatsCardProps {
  title: string;

  value: number | string;

  icon: LucideIcon;

  color?: string;

  description?: string;

  onClick?: () => void;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  color,
  description,
  onClick,
}: StatsCardProps) {
  return (
    <S.Container
      $clickable={Boolean(onClick)}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(event) => {
        if (!onClick) return;

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();

          onClick();
        }
      }}
    >
      <S.Top>
        <S.IconContainer $color={color}>
          <Icon size={22} />
        </S.IconContainer>

        <S.Value>
          {value}
        </S.Value>
      </S.Top>

      <S.Bottom>
        <S.Title>
          {title}
        </S.Title>

        {description && (
          <S.Description>
            {description}
          </S.Description>
        )}
      </S.Bottom>
    </S.Container>
  );
}
import * as S from "./styles";

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
}

export function Badge({
  children,
  color,
}: BadgeProps) {
  return (
    <S.Container $color={color}>
      {children}
    </S.Container>
  );
}
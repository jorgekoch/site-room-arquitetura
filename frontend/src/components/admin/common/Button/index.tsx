import type { ButtonHTMLAttributes, ReactNode } from "react";

import * as S from "./styles";

type Variant = "primary" | "secondary" | "danger";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  loading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  loading = false,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <S.Container
      $variant={variant}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? "Carregando..." : children}
    </S.Container>
  );
}
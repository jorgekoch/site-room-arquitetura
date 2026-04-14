import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

type ButtonVariant = "primary" | "ghost" | "ghostLight";

type ButtonProps = {
  to?: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  contrastText?: boolean;
};

const sharedStyles = css<{ $variant: ButtonVariant; $contrastText?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0.9rem 1.3rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid
    ${({ theme, $variant }) =>
      $variant === "ghost" ? theme.colors.border : theme.colors.primary};
  background: ${({ theme, $variant }) =>
    $variant === "ghost" ? "transparent" : theme.colors.primary};
  color: ${({ theme, $variant, $contrastText }) => {
    if ($variant === "ghostLight")
      return $contrastText ? theme.colors.primaryContrast : theme.colors.text;
    return $variant === "ghost"
      ? theme.colors.text
      : theme.colors.primaryContrast;
  }};

  border: 1px solid ${({ theme, $variant }) => {
    if ($variant === "ghostLight") return theme.colors.primaryBorder;
    return $variant === "ghost"
      ? theme.colors.border
      : theme.colors.primary;
  }};

  background: ${({ theme, $variant }) => {
    if ($variant === "ghostLight") return theme.colors.primarySoft;
    return $variant === "ghost" ? "transparent" : theme.colors.primary;
  }};
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default},
    background ${({ theme }) => theme.transitions.default},
    color ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-1px);

    border-color: ${({ theme, $variant }) =>
      $variant === "ghostLight"
        ? theme.colors.secondaryBorder
        : theme.colors.secondary};

    background: ${({ theme, $variant }) => {
      if ($variant === "ghostLight") return theme.colors.secondarySoft;
      return $variant === "ghost"
        ? theme.colors.surface
        : theme.colors.secondary;
    }};

    color: ${({ theme, $variant, $contrastText }) => {
      if ($variant === "ghostLight")
        return $contrastText ? theme.colors.primaryContrast : theme.colors.text;
      return $variant === "ghost" ? theme.colors.text : theme.colors.primaryContrast;
    }};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const StyledLink = styled(Link)<{ $variant: ButtonVariant; $contrastText?: boolean }>`
  ${sharedStyles}
`;

const StyledAnchor = styled.a<{ $variant: ButtonVariant; $contrastText?: boolean }>`
  ${sharedStyles}
`;

const StyledButton = styled.button<{ $variant: ButtonVariant; $contrastText?: boolean }>`
  ${sharedStyles}
`;

export function Button({
  to,
  children,
  variant = "primary",
  type = "button",
  disabled,
  onClick,
  contrastText = false,
}: ButtonProps) {
  if (to) {
    const isHashLink = to.startsWith("#") || to.includes("/#");

    if (isHashLink) {
      return (
        <StyledAnchor
          href={to}
          $variant={variant}
          $contrastText={contrastText}
          onClick={onClick}
        >
          {children}
        </StyledAnchor>
      );
    }

    return (
      <StyledLink to={to} $variant={variant} $contrastText={contrastText}>
        {children}
      </StyledLink>
    );
  }

  return (
    <StyledButton
      type={type}
      $variant={variant}
      $contrastText={contrastText}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

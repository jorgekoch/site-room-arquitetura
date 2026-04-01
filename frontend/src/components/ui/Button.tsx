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
};

const sharedStyles = css<{ $variant: ButtonVariant }>`
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
  color: ${({ theme, $variant }) => {
    if ($variant === "ghostLight") return "#f6f1e8";
    return $variant === "ghost"
      ? theme.colors.text
      : theme.colors.primaryContrast;
  }};

  border: 1px solid ${({ theme, $variant }) => {
    if ($variant === "ghostLight") return "rgba(255,255,255,0.4)";
    return $variant === "ghost"
      ? theme.colors.border
      : theme.colors.primary;
  }};

  background: ${({ theme, $variant }) => {
    if ($variant === "ghostLight") return "rgba(255,255,255,0.04)";
    return $variant === "ghost" ? "transparent" : theme.colors.primary;
  }};
  text-decoration: none;
  font-weight: 700;
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
        ? "rgba(255,255,255,0.7)"
        : theme.colors.secondary};

    background: ${({ theme, $variant }) => {
      if ($variant === "ghostLight") return "rgba(255,255,255,0.08)";
      return $variant === "ghost"
        ? theme.colors.surface
        : theme.colors.secondary;
    }};

    color: ${({ theme, $variant }) => {
      if ($variant === "ghostLight") return "#ffffff";
      return $variant === "ghost"
        ? theme.colors.text
        : theme.colors.primaryContrast;
    }};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const StyledLink = styled(Link)<{ $variant: ButtonVariant }>`
  ${sharedStyles}
`;

const StyledAnchor = styled.a<{ $variant: ButtonVariant }>`
  ${sharedStyles}
`;

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
  ${sharedStyles}
`;

export function Button({
  to,
  children,
  variant = "primary",
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  if (to) {
    const isHashLink = to.startsWith("#") || to.includes("/#");

    if (isHashLink) {
      return (
        <StyledAnchor href={to} $variant={variant} onClick={onClick}>
          {children}
        </StyledAnchor>
      );
    }

    return (
      <StyledLink to={to} $variant={variant}>
        {children}
      </StyledLink>
    );
  }

  return (
    <StyledButton
      type={type}
      $variant={variant}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}
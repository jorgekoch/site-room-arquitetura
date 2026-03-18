import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import type {
  ReactNode,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";

type ButtonVariant = "primary" | "ghost";

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
};

type ButtonAsButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: never;
    href?: never;
  };

type ButtonAsLinkProps = BaseProps & {
  to: string;
  href?: never;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

type ButtonAsAnchorProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    to?: never;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps | ButtonAsAnchorProps;

const sharedStyles = css<{ $variant: ButtonVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  min-height: 48px;
  padding: 0.9rem 1.2rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid transparent;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition:
    transform ${({ theme }) => theme.transitions.default},
    background ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default},
    color ${({ theme }) => theme.transitions.default},
    box-shadow ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-1px);
  }

  ${({ theme, $variant }) =>
    $variant === "ghost"
      ? css`
          background: transparent;
          color: ${theme.colors.text};
          border-color: ${theme.colors.border};

          &:hover {
            background: ${theme.colors.surface};
            border-color: ${theme.colors.primary};
          }
        `
      : css`
          background: ${theme.colors.primary};
          color: ${theme.colors.primaryContrast};
          box-shadow: ${theme.shadow.glow};

          &:hover {
            background: ${theme.colors.primaryHover};
          }
        `}
`;

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
  ${sharedStyles}
`;

const StyledLink = styled(Link)<{ $variant: ButtonVariant }>`
  ${sharedStyles}
`;

const StyledAnchor = styled.a<{ $variant: ButtonVariant }>`
  ${sharedStyles}
`;

export function Button(props: ButtonProps) {
  const { children, variant = "primary" } = props;

  if ("to" in props && props.to) {
    const { to, children: _children, variant: _variant, ...rest } = props;

    return (
      <StyledLink to={to} $variant={variant} {...rest}>
        {children}
      </StyledLink>
    );
  }

  if ("href" in props && props.href) {
    const { href, children: _children, variant: _variant, ...rest } = props;

    return (
      <StyledAnchor href={href} $variant={variant} {...rest}>
        {children}
      </StyledAnchor>
    );
  }

  const { children: _children, variant: _variant, ...rest } = props as ButtonAsButtonProps;

  return (
    <StyledButton type="button" $variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
}
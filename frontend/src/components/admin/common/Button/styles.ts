import styled, { css } from "styled-components";

interface Props {
  $variant: "primary" | "secondary" | "danger";
}

export const Container = styled.button<Props>`
  height: 44px;

  padding: 0 20px;

  border-radius: 12px;

  border: none;

  cursor: pointer;

  font-weight: 600;

  font-size: .95rem;

  transition: .2s;

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 10px;

  ${({ theme, $variant }) => {
    switch ($variant) {
      case "secondary":
        return css`
          background: ${theme.colors.background};
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.border};
        `;

      case "danger":
        return css`
          background: #dc2626;
          color: white;
        `;

      default:
        return css`
          background: ${theme.colors.primary};
          color: white;
        `;
    }
  }}

  &:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: .6;
    cursor: not-allowed;
  }
`;
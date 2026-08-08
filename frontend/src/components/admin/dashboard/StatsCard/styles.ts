import styled from "styled-components";

interface IconProps {
  $color?: string;
}

interface ContainerProps {
  $clickable?: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${({ theme }) =>
    theme.colors.surface};

  border: 1px solid
    ${({ theme }) => theme.colors.border};

  border-radius: 18px;

  padding: 24px;

  display: flex;

  flex-direction: column;

  gap: 24px;

  transition: 0.25s;

  cursor: ${({ $clickable }) =>
    $clickable ? "pointer" : "default"};

  &:hover {
    transform: ${({ $clickable }) =>
      $clickable
        ? "translateY(-3px)"
        : "none"};

    box-shadow: ${({ $clickable }) =>
      $clickable
        ? "0 12px 30px rgba(0, 0, 0, 0.08)"
        : "none"};

    border-color: ${({ $clickable, theme }) =>
      $clickable
        ? theme.colors.primary
        : theme.colors.border};
  }

  &:focus-visible {
    outline: 3px solid
      ${({ theme }) =>
        theme.colors.primaryRing};

    outline-offset: 2px;
  }
`;

export const Top = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;
`;

export const Bottom = styled.div`
  display: flex;

  flex-direction: column;

  gap: 6px;
`;

export const IconContainer = styled.div<IconProps>`
  width: 52px;

  height: 52px;

  border-radius: 14px;

  display: flex;

  align-items: center;

  justify-content: center;

  color: white;

  background: ${({ theme, $color }) =>
    $color ?? theme.colors.primary};
`;

export const Value = styled.h2`
  font-size: 2rem;

  font-weight: 700;

  color: ${({ theme }) =>
    theme.colors.text};

  margin: 0;
`;

export const Title = styled.span`
  font-size: 0.95rem;

  font-weight: 600;

  color: ${({ theme }) =>
    theme.colors.text};
`;

export const Description = styled.span`
  font-size: 0.82rem;

  color: ${({ theme }) =>
    theme.colors.textSoft};
`;
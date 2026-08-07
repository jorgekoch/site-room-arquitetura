import styled from "styled-components";

interface Props {
  $color?: string;
}

export const Container = styled.span<Props>`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  height: 28px;

  padding: 0 12px;

  border-radius: 999px;

  background: ${({ theme, $color }) =>
    $color ?? theme.colors.primary};

  color: white;

  font-size: .78rem;

  font-weight: 600;
`;
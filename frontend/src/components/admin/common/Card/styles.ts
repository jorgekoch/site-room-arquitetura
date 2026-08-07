import styled from "styled-components";

interface ContainerProps {
  $padding: string;
}

export const Container = styled.section<ContainerProps>`
  background: ${({ theme }) => theme.colors.surface};

  border: 1px solid ${({ theme }) => theme.colors.border};

  border-radius: 18px;

  padding: ${({ $padding }) => $padding};

  transition: .25s;

  box-shadow: 0 4px 20px rgba(0,0,0,.03);

  &:hover{
    box-shadow:0 12px 30px rgba(0,0,0,.06);
  }
`;
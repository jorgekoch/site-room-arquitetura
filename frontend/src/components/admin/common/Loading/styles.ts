import styled, { keyframes } from "styled-components";

const rotate = keyframes`
from{
transform:rotate(0deg);
}

to{
transform:rotate(360deg);
}
`;

export const Container = styled.div`
  height: 220px;

  display:flex;

  flex-direction:column;

  justify-content:center;

  align-items:center;

  gap:18px;
`;

export const Spinner = styled.div`
  width:42px;

  height:42px;

  border-radius:50%;

  border:4px solid ${({ theme }) => theme.colors.border};

  border-top-color:${({ theme }) => theme.colors.primary};

  animation:${rotate} .8s linear infinite;
`;
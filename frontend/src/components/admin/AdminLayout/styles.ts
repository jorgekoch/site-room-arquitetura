import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  min-height: 100vh;

  background: ${({ theme }) => theme.colors.background};
`;

export const Main = styled.main`
  flex: 1;

  margin-left: 280px;

  display: flex;

  flex-direction: column;

  min-width: 0;
`;

export const Content = styled.div`
  flex: 1;

  padding: 32px;

  overflow-y: auto;
`;

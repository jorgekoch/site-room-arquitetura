import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  min-height: 100vh;

  background:
    radial-gradient(circle at 100% 0, ${({ theme }) => theme.colors.primarySoft}, transparent 30rem),
    ${({ theme }) => theme.colors.background};
`;

export const Main = styled.main`
  flex: 1;

  margin-left: 280px;

  display: flex;

  flex-direction: column;

  min-width: 0;

  min-height: 100vh;
`;

export const Content = styled.div`
  flex: 1;

  width: min(100%, 1440px);

  margin: 0 auto;

  padding: 40px;

  overflow-y: auto;

  @media (max-width: 900px) {
    padding: 28px;
  }
`;

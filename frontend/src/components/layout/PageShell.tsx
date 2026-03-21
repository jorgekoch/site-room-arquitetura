import styled from "styled-components";
import type { ReactNode } from "react";
import { TopbarMobile } from "./TopbarMobile";
import { media } from "../../styles/breakpoints";

type PageShellProps = {
  children: ReactNode;
};

const Shell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  min-height: 100vh;
  padding-top: ${({ theme }) => theme.layout.mobileTopbarHeight};

  @media ${media.laptop} {
    padding-top: 0;
  }
`;

export function PageShell({ children }: PageShellProps) {
  return (
    <Shell>
      <TopbarMobile />
      <Main>{children}</Main>
    </Shell>
  );
}
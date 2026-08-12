import styled from "styled-components";
import type { ReactNode } from "react";
import { TopbarMobile } from "./TopbarMobile";
import { Footer } from "./Footer";

type PageShellProps = {
  children: ReactNode;
  hideTopbar?: boolean;
  hideFooter?: boolean;
};

const Shell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  min-height: 100vh;
`;

export function PageShell({
  children,
  hideTopbar = false,
  hideFooter = false,
}: PageShellProps) {
  return (
    <Shell>
      {!hideTopbar && <TopbarMobile />}
      <Main>{children}</Main>
      {!hideFooter && <Footer />}
    </Shell>
  );
}

import styled from "styled-components";
import type { ReactNode } from "react";
import { TopbarMobile } from "./TopbarMobile";
import { Footer } from "./Footer";
import { WhatsAppButton } from "../ui/WhatsAppButton";

type PageShellProps = {
  children: ReactNode;
};

const Shell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  min-height: 100vh;
`;

export function PageShell({ children }: PageShellProps) {
  return (
    <Shell>
      <TopbarMobile />
      <Main>{children}</Main>
      <Footer />
    </Shell>
  );
}
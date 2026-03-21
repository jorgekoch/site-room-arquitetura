import { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../ui/Container";
import { media } from "../../styles/breakpoints";

const NAV_ITEMS = [
  { label: "Início", href: "#topo", id: "topo" },
  { label: "Pra quem é", href: "#pra-quem-e", id: "pra-quem-e" },
  { label: "Como projetamos", href: "#como-projetamos", id: "como-projetamos" },
  { label: "Projetos", href: "#portfolio", id: "portfolio" },
  { label: "Processo", href: "#processo", id: "processo" },
  { label: "Formatos", href: "#formatos", id: "formatos" },
  { label: "Sobre", href: "#sobre", id: "sobre" },
  { label: "Contato", href: "#contato", id: "contato" },
];

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(14px);
  background: rgba(11, 11, 16, 0.86);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Inner = styled.div`
  min-height: 72px;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1rem;

  @media ${media.laptop} {
    min-height: 78px;
  }
`;

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
`;

const NavWrap = styled.div`
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${media.laptop} {
    overflow: visible;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: max-content;

  @media ${media.laptop} {
    justify-content: flex-end;
  }
`;

const NavLink = styled.a<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0.55rem 0.8rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.textSoft};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.surface : "transparent"};
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.border : "transparent"};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ $active }) => ($active ? 700 : 600)};
  white-space: nowrap;
  transition:
    color ${({ theme }) => theme.transitions.default},
    background ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export function TopbarMobile() {
  const [activeSection, setActiveSection] = useState("topo");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      Boolean
    ) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.15, 0.3, 0.5, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  return (
    <Bar>
      <Container>
        <Inner>
          <Brand href="#topo">ROOM</Brand>

          <NavWrap>
            <Nav aria-label="Navegação principal">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  $active={activeSection === item.id}
                  aria-current={activeSection === item.id ? "page" : undefined}
                >
                  {item.label}
                </NavLink>
              ))}
            </Nav>
          </NavWrap>
        </Inner>
      </Container>
    </Bar>
  );
}
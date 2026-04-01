import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Container } from "../ui/Container";
import { media } from "../../styles/breakpoints";
import logoRoomHorizontal from "../../assets/images/ui/logo-room-horizontal.png";
import { ThemeToggle } from "../ui/ThemeToggle";

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

const HEADER_OFFSET = 110;

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(14px);
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.04);
`;

const Inner = styled.div`
  min-height: 72px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.75rem;

  @media ${media.laptop} {
    min-height: 82px;
    gap: 1rem;
  }
`;

const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  min-width: 0;
`;

const BrandLogo = styled.img`
  display: block;
  width: auto;
  height: 60px;

  @media ${media.tablet} {
    height: 70px;
  }

  @media ${media.laptop} {
    height: 80px;
  }
`;

const BrandFallback = styled.span`
  font-weight: 700;
  letter-spacing: 0.02em;
  white-space: nowrap;
`;

const DesktopNavWrap = styled.div`
  display: none;

  @media ${media.laptop} {
    display: block;
    overflow: visible;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const NavLink = styled.a<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0.55rem 0.8rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.textSoft};
  background: ${({ $active }) =>
    $active ? "rgba(184, 111, 82, 0.08)" : "transparent"};
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(184, 111, 82, 0.6)" : "transparent"};
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
    background: rgba(184, 111, 82, 0.12);
    border-color: rgba(184, 111, 82, 0.4);
  }
`;

const DesktopRight = styled.div`
  display: none;

  @media ${media.laptop} {
    display: inline-flex;
    align-items: center;
    justify-self: end;
    gap: 0.75rem;
  }
`;

const TopCta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0.7rem 1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
  white-space: nowrap;
  width: fit-content;
  transition:
    transform ${({ theme }) => theme.transitions.default},
    opacity ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-1px);
    opacity: 0.95;
  }
`;

const MobileActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.45rem;

  @media ${media.laptop} {
    display: none;
  }
`;

const MobileCta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0.45rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  text-decoration: none;
  font-size: 0.78rem;
  font-weight: 700;
  white-space: nowrap;
  width: fit-content;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  transition:
    transform ${({ theme }) => theme.transitions.default},
    opacity ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-1px);
    opacity: 0.95;
  }

  @media ${media.tablet} {
    min-height: 36px;
    padding: 0.5rem 0.85rem;
    font-size: 0.8rem;
    max-width: 132px;
  }
`;

const MenuButton = styled.button`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const MenuIcon = styled.span<{ $open: boolean }>`
  position: relative;
  width: 18px;
  height: 14px;
  display: inline-block;

  &::before,
  &::after,
  span {
    content: "";
    position: absolute;
    left: 0;
    width: 18px;
    height: 2px;
    border-radius: 999px;
    background: currentColor;
    transition: transform 0.25s ease, opacity 0.25s ease, top 0.25s ease;
  }

  &::before {
    top: ${({ $open }) => ($open ? "6px" : "0")};
    transform: ${({ $open }) => ($open ? "rotate(45deg)" : "none")};
  }

  span {
    top: 6px;
    opacity: ${({ $open }) => ($open ? 0 : 1)};
  }

  &::after {
    top: ${({ $open }) => ($open ? "6px" : "12px")};
    transform: ${({ $open }) => ($open ? "rotate(-45deg)" : "none")};
  }
`;

const MobileOverlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(7, 10, 9, 0.66);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity 0.25s ease;

  @media ${media.laptop} {
    display: none;
  }
`;

const MobileDrawer = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1001;
  width: min(88vw, 340px);
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.md};
  transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
  transition: transform 0.28s ease;
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: 1rem;

  @media ${media.laptop} {
    display: none;
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const DrawerTitle = styled.strong`
  font-size: 1rem;
`;

const DrawerHeaderActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const DrawerClose = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

const DrawerNav = styled.nav`
  display: grid;
  align-content: start;
  gap: 0.4rem;
  padding: 1rem 0;
`;

const DrawerLink = styled.a<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0.75rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.md};
  text-decoration: none;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.textSoft};
  border: 1px solid
    ${({ $active }) =>
      $active ? "rgba(184, 111, 82, 0.6)" : "transparent"};
  background: ${({ $active }) =>
    $active ? "rgba(184, 111, 82, 0.08)" : "transparent"};
  font-weight: ${({ $active }) => ($active ? 700 : 600)};
`;

const DrawerFooter = styled.div`
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  gap: 0.7rem;
`;

const DrawerCta = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0.8rem 1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  text-decoration: none;
  background: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  font-weight: 700;
`;

const DrawerMeta = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.5;
`;

export function TopbarMobile() {
  const [activeSection, setActiveSection] = useState("topo");
  const [menuOpen, setMenuOpen] = useState(false);

  const navIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);

  useEffect(() => {
    let ticking = false;

    function updateActiveSection() {
      const sections = navIds
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      if (!sections.length) return;

      if (window.scrollY <= 40) {
        setActiveSection("topo");
        return;
      }

      const viewportAnchor = HEADER_OFFSET + 24;

      let closestId = sections[0].id;
      let closestDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - viewportAnchor);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = section.id;
        }

        if (rect.top <= viewportAnchor && rect.bottom >= viewportAnchor) {
          closestId = section.id;
          break;
        }
      }

      const reachedBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 20;

      if (reachedBottom) {
        closestId = sections[sections.length - 1].id;
      }

      setActiveSection(closestId);
    }

    function onScrollOrResize() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    }

    updateActiveSection();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [navIds]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow || "";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleCloseMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <Bar>
        <Container>
          <Inner>
            <Brand href="#topo" aria-label="ROOM Arquitetura Sustentável">
              {logoRoomHorizontal ? (
                <BrandLogo
                  src={logoRoomHorizontal}
                  alt="ROOM Arquitetura Sustentável"
                />
              ) : (
                <BrandFallback>ROOM</BrandFallback>
              )}
            </Brand>

            <DesktopNavWrap>
              <DesktopNav aria-label="Navegação principal">
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
              </DesktopNav>
            </DesktopNavWrap>

            <DesktopRight>
              <ThemeToggle />
              <TopCta href="#contato">Solicitar proposta</TopCta>
            </DesktopRight>

            <MobileActions>
              <ThemeToggle compact />
              <MobileCta href="#contato">Proposta</MobileCta>

              <MenuButton
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Abrir menu"
                aria-expanded={menuOpen}
              >
                <MenuIcon $open={menuOpen}>
                  <span />
                </MenuIcon>
              </MenuButton>
            </MobileActions>
          </Inner>
        </Container>
      </Bar>

      <MobileOverlay $open={menuOpen} onClick={handleCloseMenu} />

      <MobileDrawer $open={menuOpen} aria-hidden={!menuOpen}>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>

          <DrawerHeaderActions>
            <ThemeToggle compact />
            <DrawerClose
              type="button"
              onClick={handleCloseMenu}
              aria-label="Fechar menu"
            >
              ✕
            </DrawerClose>
          </DrawerHeaderActions>
        </DrawerHeader>

        <DrawerNav aria-label="Navegação mobile">
          {NAV_ITEMS.map((item) => (
            <DrawerLink
              key={item.href}
              href={item.href}
              $active={activeSection === item.id}
              aria-current={activeSection === item.id ? "page" : undefined}
              onClick={handleCloseMenu}
            >
              {item.label}
            </DrawerLink>
          ))}
        </DrawerNav>

        <DrawerFooter>
          <DrawerCta href="#contato" onClick={handleCloseMenu}>
            Solicitar proposta
          </DrawerCta>
          <DrawerMeta>Atendimento online em todo o Brasil</DrawerMeta>
        </DrawerFooter>
      </MobileDrawer>
    </>
  );
}
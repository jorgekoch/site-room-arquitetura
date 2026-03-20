import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { siteConfig } from "../../config/site";
import { navigationItems } from "../../config/navigation";

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: ${({ theme }) => theme.layout.mobileTopbarHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  background: rgba(18, 24, 21, 0.9);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: 1024px) {
    display: none;
  }
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  text-decoration: none;
  color: inherit;
`;

const Badge = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.primaryHover}
  );
  color: ${({ theme }) => theme.colors.primaryContrast};
  display: grid;
  place-items: center;
  font-weight: 800;
  box-shadow: ${({ theme }) => theme.shadow.glow};
  flex-shrink: 0;
`;

const BrandContent = styled.div`
  display: grid;
  min-width: 0;
`;

const Title = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Subtitle = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MenuButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  display: grid;
  place-items: center;
  cursor: pointer;
  flex-shrink: 0;
  transition:
    background ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default},
    color ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Overlay = styled.button<{ $open: boolean }>`
  position: fixed;
  inset: ${({ theme }) => theme.layout.mobileTopbarHeight} 0 0 0;
  z-index: 98;
  border: 0;
  background: rgba(0, 0, 0, 0.42);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: opacity ${({ theme }) => theme.transitions.default};

  @media (min-width: 1024px) {
    display: none;
  }
`;

const MenuPanel = styled.div<{ $open: boolean }>`
  position: fixed;
  top: ${({ theme }) => theme.layout.mobileTopbarHeight};
  left: 0;
  right: 0;
  z-index: 99;
  background: rgba(18, 24, 21, 0.98);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem;
  display: grid;
  gap: 0.9rem;

  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: ${({ $open }) =>
    $open ? "translateY(0)" : "translateY(-10px)"};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition:
    opacity ${({ theme }) => theme.transitions.default},
    transform ${({ theme }) => theme.transitions.default};

  @media (min-width: 1024px) {
    display: none;
  }
`;

const Nav = styled.nav`
  display: grid;
  gap: 0.55rem;
`;

const NavItemButton = styled.button`
  padding: 0.95rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textSoft};
  border: 1px solid transparent;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition:
    background ${({ theme }) => theme.transitions.default},
    color ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.border};
  }
`;

const BottomText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.7;
  margin-top: 0.25rem;
`;

const CtaLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.9rem 1.2rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryContrast};
  font-weight: 700;
  text-decoration: none;
  box-shadow: ${({ theme }) => theme.shadow.glow};
`;

type HamburgerIconProps = {
  open: boolean;
};

function HamburgerIcon({ open }: HamburgerIconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {open ? (
        <path
          d="M6 6L18 18M18 6L6 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <>
          <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

function scrollToSection(id: string) {
  const element = document.getElementById(id);

  if (!element) return;

  const yOffset = -80;
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
}

export function TopbarMobile() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const previous = document.body.style.overflow;

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previous || "";
    }

    return () => {
      document.body.style.overflow = previous || "";
    };
  }, [open]);

  function handleToggle() {
    setOpen((prev) => !prev);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleNavClick(target: string) {
    handleClose();

    if (target.startsWith("#")) {
      const id = target.replace("#", "");
      setTimeout(() => {
        scrollToSection(id);
      }, 10);
      return;
    }

    window.location.href = target;
  }

  return (
    <>
      <Wrapper>
        <Brand to="/">
          <Badge>{siteConfig.brand.initials}</Badge>

          <BrandContent>
            <Title>{siteConfig.brand.name}</Title>
            <Subtitle>Arquitetura residencial autoral</Subtitle>
          </BrandContent>
        </Brand>

        <MenuButton
          type="button"
          onClick={handleToggle}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          <HamburgerIcon open={open} />
        </MenuButton>
      </Wrapper>

      <Overlay
        type="button"
        aria-label="Fechar menu"
        $open={open}
        onClick={handleClose}
      />

      <MenuPanel $open={open}>
        <Nav>
          {navigationItems.map((item) => (
            <NavItemButton
              key={item.path}
              type="button"
              onClick={() => handleNavClick(item.path)}
            >
              {item.label}
            </NavItemButton>
          ))}
        </Nav>

        <BottomText>{siteConfig.footer.note}</BottomText>

        <CtaLink to={siteConfig.cta.primaryTo} onClick={handleClose}>
          {siteConfig.cta.primaryLabel}
        </CtaLink>
      </MenuPanel>
    </>
  );
}
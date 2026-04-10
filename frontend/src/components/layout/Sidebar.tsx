import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { navigationItems } from "../../config/navigation";
import { siteConfig } from "../../config/site";
import { Button } from "../ui/Button";
import { media } from "../../styles/breakpoints";

const Wrapper = styled.aside`
  display: none;

  @media ${media.laptop} {
    display: flex;
    flex-direction: column;
    width: ${({ theme }) => theme.layout.sidebarWidth};
    min-width: ${({ theme }) => theme.layout.sidebarWidth};
    height: 100vh;
    position: fixed;
    inset: 0 auto 0 0;
    padding: 2rem 1.5rem;
    background: rgba(16, 20, 13, 0.92);
    backdrop-filter: blur(14px);
    border-right: 1px solid ${({ theme }) => theme.colors.border};
    overflow-y: auto;
  }
`;

const Top = styled.div`
  display: grid;
  gap: 2rem;
`;

const Brand = styled.div`
  display: grid;
  gap: 0.6rem;
`;

const BrandBadge = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  color: ${({ theme }) => theme.colors.primaryContrast};
  display: grid;
  place-items: center;
  font-weight: 800;
  box-shadow: ${({ theme }) => theme.shadow.glow};
`;

const BrandTitle = styled.h1`
  font-size: 1.1rem;
  line-height: 1.2;
`;

const BrandSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;
`;

const Nav = styled.nav`
  display: grid;
  gap: 0.55rem;
`;

const NavItem = styled(NavLink)`
  padding: 0.95rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textSoft};
  border: 1px solid transparent;
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.border};
  }

  &.active {
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadow.glow};
  }
`;

const Bottom = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: auto;
  padding-top: 2rem;
`;

const BottomText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.7;
`;

export function Sidebar() {
  return (
    <Wrapper>
      <Top>
        <Brand>
          <BrandBadge>{siteConfig.brand.initials}</BrandBadge>
          <div>
            <BrandTitle>{siteConfig.brand.name}</BrandTitle>
            <BrandSubtitle>{siteConfig.brand.tagline}</BrandSubtitle>
          </div>
        </Brand>

        <Nav>
          {navigationItems.map((item) => (
            <NavItem key={item.path} to={item.path} end={item.path === "/"}>
              {item.label}
            </NavItem>
          ))}
        </Nav>
      </Top>

      <Bottom>
        <BottomText>{siteConfig.footer.note}</BottomText>
        <Button to={siteConfig.cta.primaryTo}>
          {siteConfig.cta.primaryLabel}
        </Button>
      </Bottom>
    </Wrapper>
  );
}

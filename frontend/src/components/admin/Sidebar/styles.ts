import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.aside`
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 10;

  width: 280px;
  height: 100vh;

  display: flex;
  flex-direction: column;

  overflow-y: auto;
  flex-shrink: 0;

  background: ${({ theme }) => theme.colors.surface};

  border-right: 1px solid ${({ theme }) => theme.colors.border};

  box-shadow: 12px 0 32px rgba(31, 27, 20, 0.04);
`;

export const Logo = styled.div`
  padding: 34px 24px 30px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h2 {
    margin: 0;

    font-size: 1.65rem;
    font-weight: 800;
    letter-spacing: 0.08em;

    color: ${({ theme }) => theme.colors.primary};
  }

  span {
    display: block;

    margin-top: 8px;

    font-size: .875rem;

    color: ${({ theme }) => theme.colors.textSoft};
  }
`;

export const Menu = styled.nav`
  flex: 1;

  display: flex;
  flex-direction: column;

  gap: 8px;

  padding: 28px 16px;
`;

export const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;

  gap: 12px;

  padding: 13px 16px;

  border-radius: 14px;

  color: ${({ theme }) => theme.colors.text};

  text-decoration: none;

  font-size: 0.94rem;
  font-weight: 500;

  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.primary};
  }

  &.active {
    background: ${({ theme }) => theme.colors.primary};

    color: #fff;

    box-shadow: 0 9px 18px ${({ theme }) => theme.colors.primaryRing};
  }

  svg {
    flex-shrink: 0;
  }
`;

export const NotificationBadge = styled.span`
  min-width: 24px;
  height: 24px;

  margin-left: auto;
  padding: 0 7px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: ${({ theme }) => theme.radius.pill};

  background: ${({ theme }) => theme.colors.secondarySoft};
  color: ${({ theme }) => theme.colors.secondary};

  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1;

  .active & {
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
  }
`;

export const Footer = styled.div`
  padding: 20px 16px 24px;

  border-top: 1px solid ${({ theme }) => theme.colors.border};

  display: flex;
  flex-direction: column;

  gap: 12px;
`;

export const SiteButton = styled.a`
  display: flex;
  align-items: center;

  gap: 12px;

  padding: 14px 16px;

  border-radius: 14px;

  text-decoration: none;

  color: ${({ theme }) => theme.colors.text};

  font-size: 0.92rem;
  font-weight: 500;

  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;

  gap: 12px;

  padding: 14px 16px;

  border: none;

  border-radius: 14px;

  background: transparent;

  cursor: pointer;

  color: ${({ theme }) => theme.colors.danger};

  font-size: 0.92rem;
  font-weight: 600;

  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.dangerSoft};
  }
`;

import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.aside`
  width: 280px;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  background: ${({ theme }) => theme.colors.surface};

  border-right: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Logo = styled.div`
  padding: 32px 24px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h2 {
    margin: 0;

    font-size: 1.5rem;
    font-weight: 700;

    color: ${({ theme }) => theme.colors.primary};
  }

  span {
    display: block;

    margin-top: 6px;

    font-size: .875rem;

    color: ${({ theme }) => theme.colors.textSoft};
  }
`;

export const Menu = styled.nav`
  flex: 1;

  display: flex;
  flex-direction: column;

  gap: 6px;

  padding: 24px 16px;
`;

export const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;

  gap: 12px;

  padding: 14px 16px;

  border-radius: 12px;

  color: ${({ theme }) => theme.colors.text};

  text-decoration: none;

  transition: .2s;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  &.active {
    background: ${({ theme }) => theme.colors.primary};

    color: #fff;
  }

  svg {
    flex-shrink: 0;
  }
`;

export const Footer = styled.div`
  padding: 24px 16px;

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

  border-radius: 12px;

  text-decoration: none;

  color: ${({ theme }) => theme.colors.text};

  transition: .2s;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;

  gap: 12px;

  padding: 14px 16px;

  border: none;

  border-radius: 12px;

  background: transparent;

  cursor: pointer;

  color: ${({ theme }) => theme.colors.danger};

  transition: .2s;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;
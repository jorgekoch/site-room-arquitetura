import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.section`
  background: ${({ theme }) =>
    theme.colors.surface};

  border: 1px solid
    ${({ theme }) => theme.colors.border};

  border-radius: 18px;

  padding: 24px;

  min-height: 420px;
`;

export const Header = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 16px;

  margin-bottom: 24px;

  h2 {
    margin: 0 0 4px;

    font-size: 1.1rem;

    font-weight: 600;

    color: ${({ theme }) =>
      theme.colors.text};
  }

  span {
    display: block;

    font-size: 0.82rem;

    color: ${({ theme }) =>
      theme.colors.textSoft};
  }

  a {
    flex-shrink: 0;

    color: ${({ theme }) =>
      theme.colors.primary};

    text-decoration: none;

    font-size: 0.9rem;

    font-weight: 600;

    transition: ${({ theme }) =>
      theme.transitions.default};

    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 600px) {
    align-items: flex-start;

    flex-direction: column;
  }
`;

export const List = styled.div`
  display: flex;

  flex-direction: column;

  gap: 4px;
`;

export const Item = styled(Link)`
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 16px;

  padding: 14px 0;

  color: inherit;

  text-decoration: none;

  border-bottom: 1px solid
    ${({ theme }) => theme.colors.border};

  transition:
    ${({ theme }) => theme.transitions.default};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    padding-left: 6px;
  }

  &:focus-visible {
    outline: 3px solid
      ${({ theme }) =>
        theme.colors.primaryRing};

    outline-offset: 4px;

    border-radius: 8px;
  }

  @media (max-width: 600px) {
    align-items: flex-start;

    flex-direction: column;
  }
`;

export const ProposalInfo = styled.div`
  display: flex;

  align-items: center;

  gap: 14px;

  min-width: 0;

  > div:last-child {
    min-width: 0;
  }

  strong {
    display: block;

    margin-bottom: 4px;

    color: ${({ theme }) =>
      theme.colors.text};

    font-size: 0.95rem;

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;
  }

  span {
    display: block;

    color: ${({ theme }) =>
      theme.colors.textSoft};

    font-size: 0.85rem;

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;
  }
`;

export const Avatar = styled.div`
  width: 44px;

  height: 44px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 12px;

  background: ${({ theme }) =>
    theme.colors.primarySoft};

  color: ${({ theme }) =>
    theme.colors.primary};

  font-size: 0.95rem;

  font-weight: 700;
`;

export const Status = styled.span`
  flex-shrink: 0;

  padding: 6px 12px;

  border-radius: 999px;

  background: ${({ theme }) =>
    theme.colors.primarySoft};

  color: ${({ theme }) =>
    theme.colors.primary};

  font-size: 0.75rem;

  font-weight: 600;

  white-space: nowrap;
`;

export const Empty = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  min-height: 260px;

  padding: 32px 0;

  color: ${({ theme }) =>
    theme.colors.textSoft};

  text-align: center;
`;
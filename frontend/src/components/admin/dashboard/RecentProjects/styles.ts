import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.section`
  background: ${({ theme }) =>
    theme.colors.surface};

  border: 1px solid
    ${({ theme }) => theme.colors.border};

  border-radius: ${({ theme }) =>
    theme.radius.md};

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

    font-weight: 600;

    font-size: 0.9rem;

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

export const ProjectInfo = styled.div`
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

    font-size: 0.85rem;

    color: ${({ theme }) =>
      theme.colors.textSoft};

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;
  }
`;

export const Thumbnail = styled.img`
  width: 56px;

  height: 56px;

  flex-shrink: 0;

  object-fit: cover;

  border-radius: 10px;

  border: 1px solid
    ${({ theme }) => theme.colors.border};

  background: ${({ theme }) =>
    theme.colors.background};
`;

export const Placeholder = styled.div`
  width: 56px;

  height: 56px;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 10px;

  background: ${({ theme }) =>
    theme.colors.background};

  border: 1px solid
    ${({ theme }) => theme.colors.border};

  span {
    font-size: 0.65rem;

    font-weight: 700;

    color: ${({ theme }) =>
      theme.colors.textSoft};
  }
`;

export const Status = styled.span<{
  $published: boolean;
}>`
  flex-shrink: 0;

  padding: 6px 12px;

  border-radius: 999px;

  font-size: 0.75rem;

  font-weight: 600;

  background: ${({ $published }) =>
    $published
      ? "#DCFCE7"
      : "#FEF3C7"};

  color: ${({ $published }) =>
    $published
      ? "#166534"
      : "#92400E"};

  @media (max-width: 600px) {
    margin-left: 70px;
  }
`;

export const Empty = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  min-height: 260px;

  color: ${({ theme }) =>
    theme.colors.textSoft};

  text-align: center;

  padding: 32px 0;
`;
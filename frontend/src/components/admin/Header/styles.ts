import styled from "styled-components";

export const Container = styled.header`
  position: sticky;
  top: 0;
  z-index: 5;

  min-height: 82px;

  background: ${({ theme }) => theme.colors.surface};

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 0 40px;

  box-shadow: 0 8px 28px rgba(31, 27, 20, 0.035);

  @media (max-width: 900px) {
    padding: 0 28px;
  }
`;

export const Left = styled.div`
  display: flex;

  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1.2rem;

  font-weight: 700;
  letter-spacing: -0.02em;

  color: ${({ theme }) => theme.colors.text};
`;

export const Right = styled.div`
  display: flex;

  align-items: center;

  gap: 12px;
`;

export const Search = styled.div`
  width: 280px;

  height: 44px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;

  background: ${({ theme }) => theme.colors.background};

  display: flex;

  align-items: center;

  padding: 0 14px;

  gap: 12px;

  transition: ${({ theme }) => theme.transitions.default};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primaryRing};
  }

  input {

    flex: 1;

    border: none;

    outline: none;

    background: transparent;

    font-size: .95rem;

    color: ${({ theme }) => theme.colors.text};
  }

  svg {
    color: ${({ theme }) => theme.colors.textSoft};
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 280px;
`;

export const SearchDropdown = styled.div`
  position: absolute;

  top: calc(100% + 10px);
  left: 0;
  right: 0;

  z-index: 1000;

  background: ${({ theme }) =>
    theme.colors.surface};

  border: 1px solid
    ${({ theme }) =>
      theme.colors.border};

  border-radius: ${({ theme }) =>
    theme.radius.md};

  box-shadow: ${({ theme }) =>
    theme.shadow.md};

  overflow: hidden;

  min-width: 320px;
`;

export const SearchSection = styled.div`
  padding: 0.5rem 0;

  & + & {
    border-top: 1px solid
      ${({ theme }) =>
        theme.colors.border};
  }
`;

export const SearchSectionTitle = styled.div`
  padding: 0.6rem 1rem;

  font-size: 0.72rem;

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 0.08em;

  color: ${({ theme }) =>
    theme.colors.textMuted};
`;

export const SearchResult = styled.button`
  width: 100%;

  border: none;

  background: transparent;

  padding: 0.75rem 1rem;

  display: flex;

  text-align: left;

  cursor: pointer;

  color: ${({ theme }) =>
    theme.colors.text};

  transition:
    background
      ${({ theme }) =>
        theme.transitions.default};

  &:hover {
    background: ${({ theme }) =>
      theme.colors.surfaceHover};
  }
`;

export const SearchResultContent = styled.div`
  display: flex;

  flex-direction: column;

  gap: 0.2rem;

  min-width: 0;

  strong {
    color: ${({ theme }) =>
      theme.colors.text};

    font-size: 0.9rem;

    font-weight: 600;

    overflow: hidden;

    text-overflow: ellipsis;

    white-space: nowrap;
  }

  span {
    color: ${({ theme }) =>
      theme.colors.textSoft};

    font-size: 0.76rem;

    overflow: hidden;

    text-overflow: ellipsis;

    white-space: nowrap;
  }
`;

export const SearchMessage = styled.div`
  padding: 1rem;

  text-align: center;

  color: ${({ theme }) =>
    theme.colors.textSoft};

  font-size: 0.85rem;
`;

export const IconButton = styled.button`
  width: 42px;
  height: 42px;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;

  background: ${({ theme }) => theme.colors.surface};

  color: ${({ theme }) => theme.colors.text};

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition:
    background ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default},
    color ${({ theme }) => theme.transitions.default},
    transform ${({ theme }) => theme.transitions.default};

  svg {
    color: ${({ theme }) => theme.colors.text};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};

    border-color: ${({ theme }) =>
      theme.colors.primaryBorder};

    color: ${({ theme }) => theme.colors.primary};

    transform: translateY(-2px);

    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) =>
      theme.colors.primary};

    outline-offset: 2px;
  }
`;

export const User = styled.div`
  display: flex;

  align-items: center;

  gap: 14px;
`;

export const Avatar = styled.div`
  width: 44px;

  height: 44px;

  border-radius: 50%;

  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 700;
  font-size: 0.82rem;
`;

export const UserInfo = styled.div`
  display: flex;

  flex-direction: column;

  strong {

    font-size: .95rem;

    color: ${({ theme }) => theme.colors.text};
  }

  span {

    font-size: .82rem;

    color: ${({ theme }) => theme.colors.textSoft};
  }
`;

export const NotificationWrapper =
  styled.div`
    position: relative;
  `;

export const NotificationBadge =
  styled.span`
    position: absolute;

    top: -5px;
    right: -5px;

    min-width: 18px;
    height: 18px;

    padding: 0 4px;

    border-radius: ${({ theme }) =>
      theme.radius.pill};

    background: ${({ theme }) =>
      theme.colors.secondary};

    color: ${({ theme }) =>
      theme.colors.secondaryContrast};

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 0.65rem;
    font-weight: 700;

    border: 2px solid
      ${({ theme }) =>
        theme.colors.surface};
  `;

export const NotificationDropdown =
  styled.div`
    position: absolute;

    top: calc(100% + 12px);
    right: 0;

    width: 340px;

    background: ${({ theme }) =>
      theme.colors.surface};

    border: 1px solid
      ${({ theme }) =>
        theme.colors.border};

    border-radius: ${({ theme }) =>
      theme.radius.md};

    box-shadow: ${({ theme }) =>
      theme.shadow.md};

    overflow: hidden;

    z-index: 1000;
  `;

export const NotificationHeader =
  styled.div`
    padding: 16px 18px;

    border-bottom: 1px solid
      ${({ theme }) =>
        theme.colors.border};

    color: ${({ theme }) =>
      theme.colors.text};

    font-size: 0.95rem;
  `;

export const NotificationItem =
  styled.button`
    width: 100%;

    display: flex;

    align-items: flex-start;

    gap: 12px;

    padding: 15px 18px;

    border: none;

    border-bottom: 1px solid
      ${({ theme }) =>
        theme.colors.border};

    background: transparent;

    color: ${({ theme }) =>
      theme.colors.text};

    text-align: left;

    cursor: pointer;

    transition:
      background
      ${({ theme }) =>
        theme.transitions.default};

    &:hover {
      background: ${({ theme }) =>
        theme.colors.surfaceHover};
    }

    &:last-child {
      border-bottom: none;
    }
  `;

export const NotificationIcon =
  styled.div`
    width: 34px;
    height: 34px;

    flex-shrink: 0;

    border-radius: ${({ theme }) =>
      theme.radius.sm};

    background: ${({ theme }) =>
      theme.colors.primarySoft};

    color: ${({ theme }) =>
      theme.colors.primary};

    display: flex;

    align-items: center;
    justify-content: center;
  `;

export const NotificationContent =
  styled.div`
    display: flex;

    flex-direction: column;

    gap: 4px;

    min-width: 0;

    strong {
      color: ${({ theme }) =>
        theme.colors.text};

      font-size: 0.85rem;
      font-weight: 600;
    }

    span {
      color: ${({ theme }) =>
        theme.colors.textSoft};

      font-size: 0.78rem;
    }
  `;

export const EmptyNotification =
  styled.div`
    min-height: 120px;

    padding: 20px;

    display: flex;

    flex-direction: column;

    align-items: center;
    justify-content: center;

    gap: 8px;

    color: ${({ theme }) =>
      theme.colors.textMuted};

    font-size: 0.82rem;

    svg {
      opacity: 0.7;
    }
  `;

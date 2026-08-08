import styled from "styled-components";

export const Container = styled.header`
  height: 82px;

  background: ${({ theme }) => theme.colors.surface};

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 0 32px;
`;

export const Left = styled.div`
  display: flex;

  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1.5rem;

  font-weight: 600;

  color: ${({ theme }) => theme.colors.text};
`;

export const Right = styled.div`
  display: flex;

  align-items: center;

  gap: 18px;
`;

export const Search = styled.div`
  width: 280px;

  height: 44px;

  border-radius: 12px;

  background: ${({ theme }) => theme.colors.background};

  display: flex;

  align-items: center;

  padding: 0 16px;

  gap: 12px;

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
  border-radius: 12px;

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

  background: ${({ theme }) => theme.colors.primary};

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 600;
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
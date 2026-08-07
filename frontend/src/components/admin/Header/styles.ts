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

export const IconButton = styled.button`
  width: 42px;

  height: 42px;

  border: none;

  border-radius: 12px;

  background: ${({ theme }) => theme.colors.background};

  cursor: pointer;

  display: flex;

  align-items: center;

  justify-content: center;

  transition: .2s;

  &:hover {
    transform: translateY(-2px);
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
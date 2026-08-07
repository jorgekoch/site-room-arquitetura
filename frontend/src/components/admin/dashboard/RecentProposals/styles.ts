import styled from "styled-components";

export const Container = styled.section`
  background: ${({ theme }) => theme.colors.surface};

  border: 1px solid ${({ theme }) => theme.colors.border};

  border-radius: 18px;

  padding: 24px;
`;

export const Header = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 24px;

  h2 {
    margin: 0;

    font-size: 1.1rem;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};

    text-decoration: none;

    font-weight: 600;
  }
`;

export const List = styled.div`
  display: flex;

  flex-direction: column;

  gap: 16px;
`;

export const Item = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  padding-bottom: 16px;

  border-bottom: 1px solid
    ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;

    padding-bottom: 0;
  }

  strong {
    display: block;

    margin-bottom: 4px;
  }

  span {
    color: ${({ theme }) => theme.colors.textSoft};

    font-size: .85rem;
  }
`;

export const Status = styled.span`
  padding: 6px 12px;

  border-radius: 999px;

  background: ${({ theme }) =>
    theme.colors.primarySoft};

  color: ${({ theme }) =>
    theme.colors.primary};

  font-size: .75rem;

  font-weight: 600;
`;

export const Empty = styled.div`
  text-align: center;

  padding: 32px 0;

  color: ${({ theme }) =>
    theme.colors.textSoft};
`;
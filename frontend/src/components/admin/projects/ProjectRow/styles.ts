import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 24px;

  padding: 24px 0;

  border-bottom: 1px solid
    ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    align-items: flex-start;
  }
`;

export const Info = styled.div`
  display: flex;

  flex-direction: column;

  gap: 6px;

  strong {
    font-size: 1rem;
  }

  span {
    color: ${({ theme }) =>
      theme.colors.textSoft};
  }

  small {
    color: ${({ theme }) =>
      theme.colors.textMuted};
  }
`;

export const Actions = styled.div`
  display: flex;

  align-items: center;

  gap: 12px;

  button {
    display: flex;

    align-items: center;

    justify-content: center;

    width: 38px;

    height: 38px;

    border: none;

    border-radius: 10px;

    background: ${({ theme }) =>
      theme.colors.background};

    cursor: pointer;

    transition: .2s;

    &:hover {
      background: ${({ theme }) =>
        theme.colors.surfaceHover};
    }
  }
`;

export const Featured = styled.span`
  display: flex;

  align-items: center;

  gap: 6px;

  color: ${({ theme }) =>
    theme.colors.secondary};

  font-size: .85rem;

  font-weight: 600;
`;
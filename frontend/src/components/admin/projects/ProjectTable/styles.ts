import styled from "styled-components";

export const Empty = styled.div`
  padding: 40px;
  text-align: center;
`;

export const Table = styled.table`
  width: 100%;

  border-collapse: collapse;

  margin-top: 30px;

  background: ${({ theme }) => theme.colors.surface};

  border-radius: 16px;

  overflow: hidden;

  th,
  td {
    padding: 18px;

    text-align: left;

    border-bottom: 1px solid
      ${({ theme }) => theme.colors.border};
  }

  th {
    background: ${({ theme }) =>
      theme.colors.surfaceSoft};
  }
`;

export const Project = styled.div`
  display: flex;

  gap: 16px;

  align-items: center;

  img {
    width: 70px;

    height: 70px;

    object-fit: cover;

    border-radius: 12px;
  }

  strong {
    display: block;
  }

  span {
    opacity: .7;
    font-size: .85rem;
  }
`;

export const Actions = styled.div`
  display: flex;

  flex-wrap: wrap;

  gap: 8px;

  button {
    padding: 8px 12px;

    cursor: pointer;

    border: none;

    border-radius: 8px;
  }
`;

export const Placeholder = styled.div`
  width: 72px;
  height: 72px;

  border-radius: 12px;

  background: ${({ theme }) =>
    theme.colors.surfaceSoft};
`;

export const Badge = styled.span`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  padding: 6px 12px;

  border-radius: 999px;

  font-size: .8rem;

  background: ${({ theme }) =>
    theme.colors.primarySoft};

  color: ${({ theme }) =>
    theme.colors.primary};
`;

export const Status = styled.span<{
  published: boolean;
}>`
  display: inline-flex;

  align-items: center;

  justify-content: center;

  padding: 6px 12px;

  border-radius: 999px;

  font-size: .8rem;

  background: ${({ published, theme }) =>
    published
      ? theme.colors.successSoft
      : theme.colors.secondarySoft};

  color: ${({ published, theme }) =>
    published
      ? theme.colors.success
      : theme.colors.secondary};
`;
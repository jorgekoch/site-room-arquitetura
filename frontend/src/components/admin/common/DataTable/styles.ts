import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.surface};

  border: 1px solid ${({ theme }) => theme.colors.border};

  border-radius: 18px;

  overflow: hidden;

  width: 100%;
`;

export const Table = styled.table`
  width: 100%;

  border-collapse: collapse;

  th {
    height: 56px;

    padding: 0 24px;

    text-align: left;

    font-size: .85rem;

    font-weight: 600;

    color: ${({ theme }) => theme.colors.textSoft};

    background: ${({ theme }) => theme.colors.background};

    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  td {
    padding: 18px 24px;

    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    color: ${({ theme }) => theme.colors.text};
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr {
    transition: background .2s;
  }

  tbody tr:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;
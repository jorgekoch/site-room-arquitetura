import styled from "styled-components";

export const Filters = styled.div`
  display: grid;

  grid-template-columns: 1fr;

  gap: 16px;

  margin-bottom: 24px;

  @media (min-width: 768px) {
    grid-template-columns:
      1.2fr
      0.8fr
      0.8fr;
  }
`;

export const Input = styled.input`
  width: 100%;

  min-height: 48px;

  padding: 12px 14px;

  border-radius: ${({ theme }) => theme.radius.md};

  border: 1px solid ${({ theme }) => theme.colors.border};

  background: ${({ theme }) => theme.colors.background};

  color: ${({ theme }) => theme.colors.text};

  font-size: 0.95rem;

  &:focus {
    outline: none;

    border-color: ${({ theme }) => theme.colors.primary};

    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryRing};
  }
`;

export const Select = styled.select`
  width: 100%;

  min-height: 48px;

  padding: 12px 14px;

  border-radius: ${({ theme }) => theme.radius.md};

  border: 1px solid ${({ theme }) => theme.colors.border};

  background: ${({ theme }) => theme.colors.background};

  color: ${({ theme }) => theme.colors.text};

  font-size: 0.95rem;

  &:focus {
    outline: none;

    border-color: ${({ theme }) => theme.colors.primary};

    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryRing};
  }
`;

export const Grid = styled.div`
  display: grid;

  gap: 24px;

  @media (min-width: 1100px) {
    grid-template-columns:
      minmax(280px, 0.8fr)
      minmax(0, 1.2fr);

    align-items: start;
  }
`;

export const Panel = styled.div`
  background: ${({ theme }) => theme.colors.surface};

  border: 1px solid ${({ theme }) => theme.colors.border};

  border-radius: ${({ theme }) => theme.radius.md};

  overflow: hidden;
`;

export const List = styled.div`
  display: flex;

  flex-direction: column;
`;

export const ItemButton = styled.button<{
  $active: boolean;
}>`
  width: 100%;

  padding: 18px;

  border: 0;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  text-align: left;

  background: ${({ theme, $active }) =>
    $active ? theme.colors.surfaceHover : "transparent"};

  color: ${({ theme }) => theme.colors.text};

  cursor: pointer;

  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }

  &:last-child {
    border-bottom: 0;
  }
`;

export const ItemTitle = styled.strong`
  display: block;

  margin-bottom: 5px;

  font-size: 0.95rem;
`;

export const ItemMeta = styled.span`
  display: block;

  margin-top: 3px;

  color: ${({ theme }) => theme.colors.textSoft};

  font-size: 0.82rem;
`;

export const Details = styled.div`
  padding: 24px;

  display: flex;

  flex-direction: column;

  gap: 20px;
`;

export const DetailTitle = styled.h2`
  margin: 0;

  font-size: 1.35rem;

  color: ${({ theme }) => theme.colors.text};
`;

export const Actions = styled.div`
  display: grid;

  gap: 12px;

  @media (min-width: 640px) {
    grid-template-columns: 1fr auto;

    align-items: center;
  }
`;

export const StatusSelect = styled.select`
  min-height: 46px;

  padding: 10px 14px;

  border-radius: ${({ theme }) => theme.radius.md};

  border: 1px solid ${({ theme }) => theme.colors.border};

  background: ${({ theme }) => theme.colors.background};

  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;

    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SaveButton = styled.button`
  min-height: 46px;

  padding: 10px 20px;

  border: 0;

  border-radius: ${({ theme }) => theme.radius.pill};

  background: ${({ theme }) => theme.colors.primary};

  color: ${({ theme }) => theme.colors.primaryContrast};

  font-weight: 600;

  cursor: pointer;

  transition: ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const Message = styled.p<{
  $error?: boolean;
}>`
  margin: 0 0 16px;

  color: ${({ theme, $error }) =>
    $error ? theme.colors.danger : theme.colors.success};

  line-height: 1.5;
`;

export const AdminBlocks = styled.div`
  display: grid;

  gap: 20px;
`;

export const Block = styled.div`
  padding-top: 20px;

  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Empty = styled.div`
  padding: 40px 24px;

  text-align: center;

  color: ${({ theme }) => theme.colors.textSoft};
`;

export const DeleteButton = styled(SaveButton)`
  background: ${({ theme }) => theme.colors.danger};

  &:hover {
    background: ${({ theme }) => theme.colors.danger};

    opacity: 0.9;
  }
`;

export const DangerZone = styled.div`
  display: flex;

  justify-content: flex-end;

  padding-top: 20px;

  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ExportSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  margin-top: 32px;
  padding-top: 24px;

  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ExportButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  min-height: 44px;
  padding: 0 20px;

  border: 0;
  border-radius: 10px;

  background: ${({ theme }) => theme.colors.primary};
  color: #fff;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  transition:
    transform 0.15s ease,
    opacity 0.15s ease;

  span {
    font-size: 18px;
    line-height: 1;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ExportDescription = styled.p`
  margin: 0;

  font-size: 12px;
  line-height: 1.5;

  color: ${({ theme }) => theme.colors.textSoft};

  text-align: center;
`;

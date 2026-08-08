import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;

  inset: 0;

  z-index: 1000;

  display: flex;

  align-items: center;
  justify-content: center;

  padding: 24px;

  background: rgba(0, 0, 0, 0.45);

  backdrop-filter: blur(3px);
`;

export const Dialog = styled.div`
  width: 100%;

  max-width: 440px;

  padding: 24px;

  border-radius:
    ${({ theme }) =>
      theme.radius.lg};

  border: 1px solid
    ${({ theme }) =>
      theme.colors.border};

  background:
    ${({ theme }) =>
      theme.colors.surface};

  box-shadow:
    0 20px 60px
    rgba(0, 0, 0, 0.18);
`;

export const Title = styled.h2`
  margin: 0;

  font-size: 1.15rem;

  font-weight: 600;

  color:
    ${({ theme }) =>
      theme.colors.text};
`;

export const Message = styled.p`
  margin: 10px 0 0;

  font-size: 0.9rem;

  line-height: 1.6;

  color:
    ${({ theme }) =>
      theme.colors.textSoft};
`;

export const Actions = styled.div`
  display: flex;

  justify-content: flex-end;

  gap: 10px;

  margin-top: 24px;
`;

export const CancelButton = styled.button`
  min-height: 42px;

  padding: 0 16px;

  border-radius:
    ${({ theme }) =>
      theme.radius.md};

  border: 1px solid
    ${({ theme }) =>
      theme.colors.border};

  background:
    ${({ theme }) =>
      theme.colors.backgroundSoft};

  color:
    ${({ theme }) =>
      theme.colors.text};

  font-family: inherit;

  font-size: 0.875rem;

  font-weight: 600;

  cursor: pointer;

  &:hover:not(:disabled) {
    background:
      ${({ theme }) =>
        theme.colors.surfaceHover};
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }
`;

export const ConfirmButton = styled.button`
  min-height: 42px;

  padding: 0 16px;

  border: none;

  border-radius:
    ${({ theme }) =>
      theme.radius.md};

  background:
    ${({ theme }) =>
      theme.colors.danger};

  color: #fff;

  font-family: inherit;

  font-size: 0.875rem;

  font-weight: 600;

  cursor: pointer;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }
`;
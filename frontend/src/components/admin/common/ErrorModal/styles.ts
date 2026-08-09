import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;

  inset: 0;

  z-index: 1000;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 1.5rem;

  background: rgba(0, 0, 0, 0.45);
`;

export const Dialog = styled.div`
  width: min(
    100%,
    440px
  );

  padding: 2rem;

  border: 1px solid
    ${({ theme }) =>
      theme.colors.border};

  border-radius:
    ${({ theme }) =>
      theme.radius.lg};

  background:
    ${({ theme }) =>
      theme.colors.surface};

  box-shadow:
    ${({ theme }) =>
      theme.shadow.md};

  text-align: center;
`;

export const Icon = styled.div`
  width: 48px;

  height: 48px;

  display: grid;

  place-items: center;

  margin: 0 auto 1rem;

  border-radius: 50%;

  background:
    ${({ theme }) =>
      theme.colors.primarySoft};

  color:
    ${({ theme }) =>
      theme.colors.primary};

  font-size: 1.25rem;

  font-weight: 700;
`;

export const Title = styled.h2`
  margin: 0 0 0.75rem;

  color:
    ${({ theme }) =>
      theme.colors.text};

  font-size: 1.25rem;

  line-height: 1.3;
`;

export const Message = styled.p`
  margin: 0;

  color:
    ${({ theme }) =>
      theme.colors.textSoft};

  line-height: 1.6;
`;

export const Button = styled.button`
  margin-top: 1.5rem;

  padding: 0.7rem 1.25rem;

  border: 0;

  border-radius:
    ${({ theme }) =>
      theme.radius.md};

  background:
    ${({ theme }) =>
      theme.colors.primary};

  color:
    ${({ theme }) =>
      theme.colors.surface};

  font: inherit;

  font-weight: 700;

  cursor: pointer;

  transition:
    opacity
      ${({ theme }) =>
        theme.transitions.default};

  &:hover {
    opacity: 0.9;
  }
`;
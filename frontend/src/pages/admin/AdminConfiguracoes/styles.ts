import styled from "styled-components";

export const Grid = styled.div`
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.section`
  background: ${({ theme }) =>
    theme.colors.surface};

  border: 1px solid
    ${({ theme }) =>
      theme.colors.border};

  border-radius: 16px;

  padding: 24px;

  box-shadow: ${({ theme }) =>
    theme.shadow.sm};
`;

export const CardHeader = styled.div`
  margin-bottom: 24px;

  h2 {
    margin: 0;

    font-size: 1.15rem;

    font-weight: 600;

    color: ${({ theme }) =>
      theme.colors.text};
  }

  p {
    margin: 6px 0 0;

    font-size: 0.9rem;

    line-height: 1.5;

    color: ${({ theme }) =>
      theme.colors.textSoft};
  }
`;

export const Options = styled.div`
  display: flex;

  flex-direction: column;

  gap: 12px;
`;

export const Option = styled.button<{
  $active: boolean;
}>`
  width: 100%;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 16px;

  padding: 16px;

  border: 1px solid
    ${({ theme, $active }) =>
      $active
        ? theme.colors.primary
        : theme.colors.border};

  border-radius: 12px;

  background: ${({ theme, $active }) =>
    $active
      ? theme.colors.primarySoft
      : theme.colors.background};

  color: ${({ theme }) =>
    theme.colors.text};

  text-align: left;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) =>
      theme.colors.primary};

    background: ${({ theme }) =>
      theme.colors.primarySoft};
  }
`;

export const OptionContent = styled.div`
  display: flex;

  flex-direction: column;

  gap: 4px;

  strong {
    font-size: 0.95rem;

    color: ${({ theme }) =>
      theme.colors.text};
  }

  span {
    font-size: 0.82rem;

    line-height: 1.4;

    color: ${({ theme }) =>
      theme.colors.textSoft};
  }
`;

export const Radio = styled.span<{
  $active: boolean;
}>`
  width: 18px;

  height: 18px;

  flex-shrink: 0;

  border-radius: 50%;

  border: 2px solid
    ${({ theme, $active }) =>
      $active
        ? theme.colors.primary
        : theme.colors.border};

  background: ${({ theme, $active }) =>
    $active
      ? theme.colors.primary
      : "transparent"};

  box-shadow: ${({ theme, $active }) =>
    $active
      ? `inset 0 0 0 4px ${theme.colors.surface}`
      : "none"};
`;

export const Info = styled.div`
  display: flex;

  flex-direction: column;

  gap: 8px;

  padding: 16px;

  border-radius: 12px;

  background: ${({ theme }) =>
    theme.colors.background};

  strong {
    font-size: 0.95rem;

    color: ${({ theme }) =>
      theme.colors.text};
  }

  span {
    font-size: 0.85rem;

    line-height: 1.5;

    color: ${({ theme }) =>
      theme.colors.textSoft};
  }
`;

export const Form = styled.form`
  display: flex;

  flex-direction: column;

  gap: 18px;
`;

export const Field = styled.div`
  display: flex;

  flex-direction: column;

  gap: 7px;

  label {
    font-size: 0.875rem;

    font-weight: 500;

    color: ${({ theme }) =>
      theme.colors.text};
  }

  input {
    width: 100%;

    height: 44px;

    padding: 0 14px;

    border: 1px solid
      ${({ theme }) =>
        theme.colors.border};

    border-radius: 10px;

    background: ${({ theme }) =>
      theme.colors.background};

    color: ${({ theme }) =>
      theme.colors.text};

    font-family: inherit;

    outline: none;

    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &:focus {
      border-color: ${({ theme }) =>
        theme.colors.primary};

      box-shadow:
        0 0 0 3px
        ${({ theme }) =>
          theme.colors.primaryRing};
    }

    &::placeholder {
      color: ${({ theme }) =>
        theme.colors.textMuted};
    }
  }
`;

export const Actions = styled.div`
  display: flex;

  justify-content: flex-end;

  margin-top: 4px;
`;

export const PrimaryButton = styled.button`
  min-height: 42px;

  padding: 0 18px;

  border: none;

  border-radius: 10px;

  background: ${({ theme }) =>
    theme.colors.primary};

  color: ${({ theme }) =>
    theme.colors.primaryContrast};

  font-family: inherit;

  font-size: 0.875rem;

  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) =>
      theme.colors.primaryHover};

    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.p`
  margin: 0;

  padding: 10px 12px;

  border: 1px solid
    ${({ theme }) =>
      theme.colors.dangerBorder};

  border-radius: 8px;

  background: ${({ theme }) =>
    theme.colors.dangerSoft};

  color: ${({ theme }) =>
    theme.colors.danger};

  font-size: 0.82rem;

  line-height: 1.4;
`;

export const SuccessMessage = styled.p`
  margin: 0;

  padding: 10px 12px;

  border: 1px solid
    ${({ theme }) =>
      theme.colors.successBorder};

  border-radius: 8px;

  background: ${({ theme }) =>
    theme.colors.successSoft};

  color: ${({ theme }) =>
    theme.colors.success};

  font-size: 0.82rem;

  line-height: 1.4;
`;

export const PasswordInputWrapper =
  styled.div`
    position: relative;
  `;

export const PasswordInput =
  styled.input`
    width: 100%;

    height: 44px;

    padding: 0 48px 0 14px;

    border: 1px solid
      ${({ theme }) =>
        theme.colors.border};

    border-radius: 10px;

    background: ${({ theme }) =>
      theme.colors.background};

    color: ${({ theme }) =>
      theme.colors.text};

    font-family: inherit;

    outline: none;

    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &:focus {
      border-color:
        ${({ theme }) =>
          theme.colors.primary};

      box-shadow:
        0 0 0 3px
        ${({ theme }) =>
          theme.colors.primaryRing};
    }

    &::placeholder {
      color:
        ${({ theme }) =>
          theme.colors.textMuted};
    }
  `;

export const PasswordToggle =
  styled.button`
    position: absolute;

    top: 50%;
    right: 10px;

    transform:
      translateY(-50%);

    display: flex;

    align-items: center;
    justify-content: center;

    width: 32px;
    height: 32px;

    border: none;

    border-radius: 8px;

    background: transparent;

    color:
      ${({ theme }) =>
        theme.colors.textMuted};

    cursor: pointer;

    transition:
      color 0.2s ease,
      background 0.2s ease;

    &:hover {
      color:
        ${({ theme }) =>
          theme.colors.text};

      background:
        ${({ theme }) =>
          theme.colors.surfaceHover};
    }
  `;
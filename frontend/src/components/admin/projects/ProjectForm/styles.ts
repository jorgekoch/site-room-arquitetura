import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  gap: 24px;

  padding: 24px;
  margin-bottom: 32px;

  background: ${({ theme }) => theme.colors.surface};

  border: 1px solid ${({ theme }) => theme.colors.border};

  border-radius: ${({ theme }) => theme.radius.md};
`;

export const Row = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;

  gap: 8px;

  label {
    font-weight: 600;

    color: ${({ theme }) => theme.colors.text};
  }

  input,
  select,
  textarea {
    width: 100%;

    padding: 12px 14px;

    border-radius: ${({ theme }) => theme.radius.sm};

    border: 1px solid ${({ theme }) => theme.colors.border};

    background: ${({ theme }) => theme.colors.background};

    color: ${({ theme }) => theme.colors.text};

    font-size: 1rem;

    transition: ${({ theme }) => theme.transitions.default};

    &:focus {
      outline: none;

      border-color: ${({ theme }) => theme.colors.primary};

      box-shadow: 0 0 0 3px
        ${({ theme }) => theme.colors.primaryRing};
    }
  }

  textarea {
    resize: vertical;

    min-height: 120px;
  }
`;

export const Checks = styled.div`
  display: flex;

  gap: 32px;

  label {
    display: flex;

    align-items: center;

    gap: 8px;

    cursor: pointer;

    font-weight: 500;
  }

  input {
    width: auto;
  }
`;

export const Actions = styled.div`
  display: flex;

  justify-content: flex-end;

  button {
    padding: 14px 28px;

    border: none;

    border-radius: ${({ theme }) => theme.radius.md};

    background: ${({ theme }) => theme.colors.primary};

    color: ${({ theme }) => theme.colors.primaryContrast};

    font-weight: 600;

    cursor: pointer;

    transition: ${({ theme }) => theme.transitions.default};

    &:hover {
      background: ${({ theme }) => theme.colors.primaryHover};
    }

    &:disabled {
      opacity: .6;

      cursor: not-allowed;
    }
  }
`;

export const Gallery = styled.div`
  display: grid;

  grid-template-columns: repeat(
    auto-fill,
    minmax(160px, 1fr)
  );

  gap: 20px;

  margin-top: 20px;
`;

export const ImageCard = styled.div`
  display: flex;

  flex-direction: column;

  gap: 10px;

  img {
    width: 100%;

    aspect-ratio: 1;

    object-fit: cover;

    border-radius: 12px;

    border: 1px solid
      ${({ theme }) => theme.colors.border};
  }

  button {
    border: none;

    border-radius: 8px;

    padding: 10px;

    cursor: pointer;

    background: ${({ theme }) =>
      theme.colors.danger};

    color: white;

    font-size: .85rem;
  }
`;
export const CoverPreview = styled.img`
  width: 260px;

  border-radius: 12px;

  margin-top: 16px;

  border: 1px solid
    ${({ theme }) => theme.colors.border};

  object-fit: cover;
`;

export const UploadHint = styled.small`
  color: ${({ theme }) =>
    theme.colors.textMuted};

  margin-top: 8px;

  display: block;
`;
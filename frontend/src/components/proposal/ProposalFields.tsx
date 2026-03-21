import styled from "styled-components";
import { media } from "../../styles/breakpoints";

export const StepWrapper = styled.section`
  display: grid;
  gap: 1rem;
`;

export const StepHeader = styled.div`
  display: grid;
  gap: 0.45rem;
  margin-bottom: 0.5rem;
`;

export const StepTitle = styled.h2`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  line-height: 1.15;
`;

export const StepDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;
`;

export const Grid = styled.div`
  display: grid;
  gap: 1rem;
`;

export const Inline = styled.div`
  display: grid;
  gap: 1rem;

  @media ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Field = styled.div`
  display: grid;
  gap: 0.45rem;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
`;

export const Input = styled.input`
  min-height: 50px;
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.9rem 1rem;
  transition:
    border-color ${({ theme }) => theme.transitions.default},
    box-shadow ${({ theme }) => theme.transitions.default};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(79, 178, 134, 0.18);
  }
`;

export const Select = styled.select`
  min-height: 50px;
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.9rem 1rem;
  transition:
    border-color ${({ theme }) => theme.transitions.default},
    box-shadow ${({ theme }) => theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(79, 178, 134, 0.18);
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 140px;
  resize: vertical;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem;
  transition:
    border-color ${({ theme }) => theme.transitions.default},
    box-shadow ${({ theme }) => theme.transitions.default};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(79, 178, 134, 0.18);
  }
`;

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: 1.5;
`;

export const HelperText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.7;
`;

export const RadioGroup = styled.div`
  display: grid;
  gap: 0.75rem;
`;

export const RadioItem = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.95rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.7;
`;

export const CheckboxGroup = styled.div`
  display: grid;
  gap: 0.75rem;
`;

export const CheckboxItem = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.95rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.7;
`;

export const TermsBox = styled.div`
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  display: grid;
  gap: 0.75rem;
`;

export const ReviewBox = styled.div`
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  display: grid;
  gap: 0.5rem;
`;

export const ReviewTitle = styled.h3`
  font-size: 1rem;
  line-height: 1.3;
`;

export const ReviewText = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.7;
`;

export const Divider = styled.hr`
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 0.5rem 0;
`;
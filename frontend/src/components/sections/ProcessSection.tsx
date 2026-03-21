import styled from "styled-components";
import { Container } from "../ui/Container";
import { SectionHeader } from "./SectionHeader";
import { media } from "../../styles/breakpoints";

type ProcessSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  steps?: string[];
};

const Section = styled.section`
  padding: 1rem 0 5rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${media.laptop} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StepCard = styled.article`
  padding: 1.25rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition:
    transform ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default},
    background ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.secondary};
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const StepNumber = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  margin-bottom: 0.85rem;
  border-radius: 50%;
  background: rgba(196, 110, 78, 0.12);
  border: 1px solid rgba(196, 110, 78, 0.28);
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 700;
`;

const StepTitle = styled.h3`
  font-size: 1rem;
  line-height: 1.4;
`;

export function ProcessSection({
  eyebrow = "Processo",
  title = "Um processo claro, estruturado e construído junto",
  description = "Da primeira conversa até o projeto executivo, cada etapa é pensada para trazer clareza e segurança.",
  steps = [],
}: ProcessSectionProps) {
  return (
    <Section id="processo">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <Grid>
          {steps.map((step, index) => (
            <StepCard key={index}>
              <StepNumber>{String(index + 1).padStart(2, "0")}</StepNumber>
              <StepTitle>{step}</StepTitle>
            </StepCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
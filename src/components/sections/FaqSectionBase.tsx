import styled from "styled-components";
import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { SectionHeader } from "./SectionHeader";
import { media } from "../../styles/breakpoints";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionBaseProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: FaqItem[];
};

const Section = styled.section`
  padding: 1rem 0 4rem;

  @media ${media.laptop} {
    padding: 1rem 0 5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FaqCard = styled(Card)`
  display: grid;
  gap: 0.75rem;
  align-content: start;
`;

const Question = styled.h3`
  font-size: 1.05rem;
  line-height: 1.35;
`;

const Answer = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;
`;

export function FaqSectionBase({
  eyebrow = "Perguntas frequentes",
  title = "Respostas que ajudam a reduzir dúvidas e aumentar confiança",
  description = "Use esta seção para responder perguntas comuns e tornar o próximo passo mais natural.",
  items = [],
}: FaqSectionBaseProps) {
  return (
    <Section>
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />

        <Grid>
          {items.map((item, index) => (
            <FaqCard key={index}>
              <Question>{item.question}</Question>
              <Answer>{item.answer}</Answer>
            </FaqCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
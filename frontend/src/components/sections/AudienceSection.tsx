import styled from "styled-components";
import { Container } from "../ui/Container";
import { SectionHeader } from "./SectionHeader";
import { media } from "../../styles/breakpoints";

type AudienceItem = {
  title: string;
  description: string;
};

type AudienceSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: AudienceItem[];
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
`;

const Card = styled.article`
  padding: 1.35rem;
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

const CardTitle = styled.h3`
  font-size: 1.05rem;
  line-height: 1.3;
  margin-bottom: 0.55rem;
`;

const CardText = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;
`;

export function AudienceSection({
  eyebrow = "Para quem é",
  title = "A ROOM faz sentido para quem quer construir com mais identidade, clareza e pertencimento",
  description = "A proposta da ROOM conversa principalmente com pessoas que estão planejando a primeira casa e desejam um projeto mais consciente, funcional e conectado à própria forma de viver.",
  items = [],
}: AudienceSectionProps) {
  return (
    <Section id="para-quem-e">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <Grid>
          {items.map((item, index) => (
            <Card key={index}>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.description}</CardText>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
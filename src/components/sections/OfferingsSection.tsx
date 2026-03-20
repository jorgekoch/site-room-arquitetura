import styled from "styled-components";
import { Container } from "../ui/Container";
import { Tag } from "../ui/Tag";
import { SectionHeader } from "./SectionHeader";
import { media } from "../../styles/breakpoints";

type OfferingItem = {
  tag: string;
  title: string;
  description: string;
  bullets: string[];
};

type OfferingsSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: OfferingItem[];
  note?: string;
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
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.article`
  padding: 1.35rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  display: grid;
  gap: 0.9rem;
  transition:
    transform ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default},
    background ${({ theme }) => theme.transitions.default},
    box-shadow ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.secondary};
    background: ${({ theme }) => theme.colors.surfaceHover};
    box-shadow: 0 10px 24px rgba(196, 110, 78, 0.08);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  line-height: 1.25;
`;

const CardText = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;
`;

const BulletList = styled.ul`
  display: grid;
  gap: 0.7rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Bullet = styled.li`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.7;
  padding-left: 1rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.72rem;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const Note = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.75;
  max-width: 900px;
`;

export function OfferingsSection({
  eyebrow = "Formatos de atendimento",
  title = "Diferentes formas de conduzir o projeto, conforme a profundidade que sua casa precisa",
  description = "A ROOM estrutura o atendimento de forma personalizada, mas pode trabalhar com diferentes níveis de aprofundamento conforme o momento, a complexidade e o tipo de entrega ideal para cada cliente.",
  items = [],
  note,
}: OfferingsSectionProps) {
  return (
    <Section id="formatos">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <Grid>
          {items.map((item, index) => (
            <Card key={index}>
              <Tag>{item.tag}</Tag>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.description}</CardText>

              <BulletList>
                {item.bullets.map((bullet, bulletIndex) => (
                  <Bullet key={bulletIndex}>{bullet}</Bullet>
                ))}
              </BulletList>
            </Card>
          ))}
        </Grid>

        {note && <Note>{note}</Note>}
      </Container>
    </Section>
  );
}
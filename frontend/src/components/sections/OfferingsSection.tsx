import styled from "styled-components";
import { Container } from "../ui/Container";
import { SectionHeader } from "./SectionHeader";
import { media } from "../../styles/breakpoints";

type Offering = {
  title: string;
  description: string;
};

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: Offering[];
  note?: string;
};

const Section = styled.section`
  padding: 1rem 0 5rem;
  scroll-margin-top: 92px;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled.div`
  padding: 1.2rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition:
    transform ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default},
    background ${({ theme }) => theme.transitions.default},
    box-shadow ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.secondary};
    background: ${({ theme }) => theme.colors.surfaceHover};
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;

const Title = styled.h3`
  margin-bottom: 0.4rem;
  line-height: 1.3;
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.7;
`;

const Note = styled.p`
  margin-top: 1.5rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.7;
`;

export function OfferingsSection({
  id,
  eyebrow,
  title = "Formatos",
  description,
  items = [],
  note,
}: Props) {
  return (
    <Section id={id}>
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <Grid>
          {items.map((item, index) => (
            <Card key={index}>
              <Title>{item.title}</Title>
              <Text>{item.description}</Text>
            </Card>
          ))}
        </Grid>

        {note && <Note>{note}</Note>}
      </Container>
    </Section>
  );
}
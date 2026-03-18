import styled from "styled-components";
import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { SectionHeader } from "./SectionHeader";
import { media } from "../../styles/breakpoints";

type AuthorityItem = {
  value: string;
  title: string;
  text: string;
};

type AuthoritySectionBaseProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: AuthorityItem[];
  showHeader?: boolean;
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

  @media ${media.laptop} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const AuthorityCard = styled(Card)`
  display: grid;
  gap: 0.65rem;
  align-content: start;
`;

const Value = styled.strong`
  font-size: 1.4rem;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.text};

  @media ${media.tablet} {
    font-size: 1.6rem;
  }
`;

const Title = styled.h3`
  font-size: 1rem;
  line-height: 1.3;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.7;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export function AuthoritySectionBase({
  eyebrow = "Credibilidade",
  title = "Elementos que reforçam confiança",
  description = "Use esta seção para mostrar experiência, diferenciais, números, formação ou qualquer ponto que ajude a validar a sua autoridade.",
  items = [],
  showHeader = true,
}: AuthoritySectionBaseProps) {
  return (
    <Section>
      <Container>
        {showHeader && (
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        )}

        <Grid>
          {items.map((item, index) => (
            <AuthorityCard key={index}>
              <Value>{item.value}</Value>
              <Title>{item.title}</Title>
              <Text>{item.text}</Text>
            </AuthorityCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
import styled from "styled-components";
import { Container } from "../components/ui/Container";
import { ProposalForm } from "../components/proposal/ProposalForm";
import { media } from "../styles/breakpoints";

const Section = styled.section`
  padding: 2rem 0 5rem;

  @media ${media.laptop} {
    padding: 3rem 0 6rem;
  }
`;

const Header = styled.div`
  display: grid;
  gap: 0.8rem;
  max-width: 820px;
  margin: 0 auto 2rem;
  text-align: center;
`;

const Eyebrow = styled.span`
  display: inline-flex;
  width: fit-content;
  margin: 0 auto;
  padding: 0.45rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(196, 110, 78, 0.12);
  border: 1px solid rgba(196, 110, 78, 0.28);
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3.4rem);
  line-height: 1.08;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.8;
  max-width: 760px;
  margin: 0 auto;
`;

const Card = styled.div`
  max-width: 1040px;
  margin: 0 auto;
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.sm};

  @media ${media.tablet} {
    padding: 2rem;
  }

  @media ${media.laptop} {
    padding: 2.2rem;
  }
`;

export default function Contato() {
  return (
    <Section>
      <Container>
        <Header>
          <Eyebrow>Solicitação de proposta</Eyebrow>
          <Title>
            Vamos entender seu projeto com profundidade antes de propor qualquer solução
          </Title>
          <Description>
            Este formulário inicial ajuda a ROOM a compreender melhor o contexto,
            as necessidades e o tipo de experiência mais adequada para o seu projeto.
          </Description>
        </Header>

        <Card>
          <ProposalForm />
        </Card>
      </Container>
    </Section>
  );
}
import styled from "styled-components";
import { Container } from "../components/ui/Container";
import { ProposalForm } from "../components/proposal/ProposalForm";

const Section = styled.section`
  padding: 2rem 0 5rem;
`;

const Header = styled.div`
  display: grid;
  gap: 0.8rem;
  max-width: 820px;
  margin-bottom: 2rem;
`;

const Eyebrow = styled.span`
  display: inline-flex;
  width: fit-content;
  padding: 0.45rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.secondarySoft};
  border: 1px solid ${({ theme }) => theme.colors.secondaryBorder};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3.6rem);
  line-height: 1.08;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.8;
  max-width: 760px;
`;

const Card = styled.div`
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

export default function SolicitarProposta() {
  return (
    <Section>
      <Container>
        <Header>
          <Eyebrow>Solicitação de proposta</Eyebrow>
          <Title>Vamos entender seu projeto com profundidade antes de propor qualquer solução</Title>
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

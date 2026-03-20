import styled from "styled-components";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { media } from "../styles/breakpoints";

const Section = styled.section`
  padding: 2rem 0 5rem;

  @media ${media.laptop} {
    padding: 3rem 0 6rem;
  }
`;

const Card = styled.div`
  max-width: 820px;
  padding: 1.75rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.md};
  display: grid;
  gap: 1rem;
`;

const Eyebrow = styled.span`
  display: inline-flex;
  width: fit-content;
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
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height: 1.08;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.8;
`;

const VideoPlaceholder = styled.div`
  min-height: 280px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  color: ${({ theme }) => theme.colors.textMuted};
  display: grid;
  place-items: center;
  text-align: center;
  padding: 1.25rem;
`;

const List = styled.ul`
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  padding-left: 1rem;
  position: relative;
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;

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

const Actions = styled.div`
  display: grid;
  gap: 0.75rem;

  @media ${media.tablet} {
    display: flex;
    flex-wrap: wrap;
  }

  & > * {
    width: 100%;

    @media ${media.tablet} {
      width: auto;
    }
  }
`;

export default function PropostaEnviada() {
  return (
    <Section>
      <Container>
        <Card>
          <Eyebrow>Solicitação recebida</Eyebrow>
          <Title>Obrigado por compartilhar seu projeto com a ROOM</Title>

          <Text>
            A partir daqui, o próximo passo é entender melhor como funciona o processo
            e o que esperar da primeira reunião.
          </Text>

          <VideoPlaceholder>
            Aqui você pode incorporar um vídeo explicando o processo, a reunião de imersão,
            a taxa inicial e os próximos passos.
          </VideoPlaceholder>

          <List>
            <Item>A solicitação será analisada com base nas informações enviadas.</Item>
            <Item>Depois disso, você recebe orientações sobre o processo da ROOM.</Item>
            <Item>Na sequência, entra a etapa de taxa inicial e agendamento da reunião.</Item>
          </List>

          <Actions>
            <Button to="/">Voltar para a Home</Button>
            <Button to="/contato" variant="ghost">
              Revisar informações
            </Button>
          </Actions>
        </Card>
      </Container>
    </Section>
  );
}
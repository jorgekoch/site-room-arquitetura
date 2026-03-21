import styled from "styled-components";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { media } from "../styles/breakpoints";

const VIDEO_URL = "https://www.youtube.com/embed/f2b24BQ4-3Q";

const Section = styled.section`
  padding: 2rem 0 5rem;

  @media ${media.laptop} {
    padding: 3rem 0 6rem;
  }
`;

const Card = styled.div`
  max-width: 940px;
  margin: 0 auto;
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.md};
  display: grid;
  gap: 1.25rem;

  @media ${media.tablet} {
    padding: 2rem;
    gap: 1.4rem;
  }

  @media ${media.laptop} {
    padding: 2.2rem;
  }
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
  font-size: clamp(2rem, 4vw, 3.2rem);
  line-height: 1.05;
  max-width: 760px;
`;

const Intro = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.85;
  max-width: 760px;
`;

const PriorityCard = styled.div`
  display: grid;
  gap: 0.7rem;
  padding: 1rem 1.1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid rgba(196, 110, 78, 0.24);
  background: linear-gradient(
    180deg,
    rgba(196, 110, 78, 0.08),
    rgba(196, 110, 78, 0.03)
  );
`;

const PriorityTitle = styled.h2`
  font-size: 1rem;
  line-height: 1.25;
`;

const PriorityText = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;
`;

const VideoBlock = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const VideoHeader = styled.div`
  display: grid;
  gap: 0.45rem;
`;

const VideoTitle = styled.h2`
  font-size: clamp(1.2rem, 2.5vw, 1.55rem);
  line-height: 1.2;
`;

const VideoText = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;
`;

const VideoFrame = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  box-shadow: ${({ theme }) => theme.shadow.sm};

  iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media ${media.laptop} {
    grid-template-columns: 1.05fr 0.95fr;
    align-items: stretch;
  }
`;

const InfoCard = styled.div`
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  display: grid;
  gap: 0.85rem;
  height: 100%;
`;

const InfoTitle = styled.h3`
  font-size: 1rem;
  line-height: 1.3;
`;

const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;
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

const Highlight = styled.strong`
  color: ${({ theme }) => theme.colors.text};
`;

const FaqSection = styled.div`
  display: grid;
  gap: 0.9rem;
`;

const FaqTitle = styled.h2`
  font-size: clamp(1.15rem, 2.3vw, 1.4rem);
  line-height: 1.2;
`;

const FaqGrid = styled.div`
  display: grid;
  gap: 0.85rem;

  @media ${media.laptop} {
    grid-template-columns: repeat(3, 1fr);
    align-items: stretch;
  }
`;

const FaqCard = styled.div`
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  display: grid;
  gap: 0.5rem;
  height: 100%;
`;

const FaqQuestion = styled.h3`
  font-size: 0.98rem;
  line-height: 1.3;
`;

const FaqAnswer = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.7;
`;

const Closing = styled.div`
  display: grid;
  gap: 0.6rem;
  padding-top: 0.35rem;
`;

const ClosingTitle = styled.h2`
  font-size: clamp(1.1rem, 2.2vw, 1.35rem);
  line-height: 1.2;
`;

const ClosingText = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.8;
  max-width: 760px;
`;

const Actions = styled.div`
  display: grid;
  gap: 0.75rem;
  margin-top: 0.25rem;

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

          <Title>Obrigada por compartilhar seu projeto com a ROOM</Title>

          <Intro>
            Sua solicitação foi enviada com sucesso. Antes da próxima etapa, é
            importante assistir ao vídeo abaixo para entender melhor como
            funciona o processo, o que esperar do atendimento e como seguimos
            até a primeira conversa.
          </Intro>

          <PriorityCard>
            <PriorityTitle>Importante antes da reunião</PriorityTitle>
            <PriorityText>
              Este vídeo foi pensado para alinhar expectativas, explicar a
              dinâmica inicial do atendimento e tornar a próxima etapa mais
              clara, leve e proveitosa para você.
            </PriorityText>
          </PriorityCard>

          <VideoBlock>
            <VideoFrame>
              <iframe
                src={VIDEO_URL}
                title="Vídeo explicativo ROOM Arquitetura Sustentável"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </VideoFrame>
          </VideoBlock>

          <Grid>
            <InfoCard>
              <InfoTitle>O que acontece agora</InfoTitle>

              <List>
                <Item>
                  Sua solicitação será analisada com base nas informações
                  enviadas no formulário.
                </Item>

                <Item>
                  Com essa etapa concluída, seguimos para o{" "}
                  <Highlight>agendamento da primeira reunião</Highlight>.
                </Item>
              </List>
            </InfoCard>

            <InfoCard>
              <InfoTitle>Dica para aproveitar melhor esta etapa</InfoTitle>
              <InfoText>
                Assista ao vídeo com calma e, se quiser, já anote dúvidas,
                expectativas e pontos importantes sobre o seu projeto. Isso
                ajuda a tornar a próxima conversa ainda mais objetiva e
                produtiva.
              </InfoText>
            </InfoCard>
          </Grid>

          <FaqSection>
            <FaqTitle>Dúvidas rápidas</FaqTitle>

            <FaqGrid>
              <FaqCard>
                <FaqQuestion>Preciso assistir ao vídeo inteiro?</FaqQuestion>
                <FaqAnswer>
                  Sim. Ele ajuda a explicar o processo com mais clareza e
                  prepara melhor você para a próxima etapa.
                </FaqAnswer>
              </FaqCard>

              <FaqCard>
                <FaqQuestion>Quando acontece o próximo contato?</FaqQuestion>
                <FaqAnswer>
                  Depois da análise da sua solicitação, a ROOM segue com as
                  orientações da continuidade do processo e o agendamento da
                  reunião.
                </FaqAnswer>
              </FaqCard>

              <FaqCard>
                <FaqQuestion>Posso reunir dúvidas para a reunião?</FaqQuestion>
                <FaqAnswer>
                  Sim. Essa é uma ótima forma de aproveitar melhor a conversa e
                  tornar o encontro mais objetivo e produtivo.
                </FaqAnswer>
              </FaqCard>
            </FaqGrid>
          </FaqSection>

          <Closing>
            <ClosingTitle>Seguimos daqui em diante com mais clareza</ClosingTitle>
            <ClosingText>
              A proposta da ROOM é construir um processo cuidadoso, sensível e
              bem alinhado desde o começo. Este primeiro passo ajuda a preparar
              uma experiência mais consciente, organizada e coerente com o que
              o seu projeto precisa.
            </ClosingText>
          </Closing>

          <Actions>
            <Button to="/">Voltar para a Home</Button>
          </Actions>
        </Card>
      </Container>
    </Section>
  );
}
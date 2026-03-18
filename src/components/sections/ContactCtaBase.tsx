import styled from "styled-components";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { media } from "../../styles/breakpoints";

type CtaLink = {
  label: string;
  to: string;
};

type ContactCtaBaseProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
};

const Section = styled.section`
  padding: 1rem 0 5rem;
`;

const Card = styled.div`
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  background:
    linear-gradient(180deg, rgba(139, 92, 246, 0.12), rgba(139, 92, 246, 0.03)),
    ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.glow};
  display: grid;
  gap: 1rem;

  @media ${media.tablet} {
    padding: 2rem;
  }

  @media ${media.laptop} {
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 2rem;
  }
`;

const Content = styled.div`
  display: grid;
  gap: 0.65rem;
`;

const Eyebrow = styled.span`
  display: inline-flex;
  width: fit-content;
  padding: 0.45rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(139, 92, 246, 0.12);
  border: 1px solid rgba(139, 92, 246, 0.24);
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-size: clamp(1.6rem, 4vw, 3rem);
  line-height: 1.08;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;
  max-width: 720px;
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

export function ContactCtaBase({
  eyebrow = "Próximo passo",
  title = "Transforme interesse em ação",
  description = "Use este bloco para convidar a pessoa a entrar em contato, solicitar orçamento ou iniciar o atendimento.",
  primaryCta = { label: "Entrar em contato", to: "/contato" },
  secondaryCta,
}: ContactCtaBaseProps) {
  return (
    <Section>
      <Container>
        <Card>
          <Content>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <Title>{title}</Title>
            {description && <Text>{description}</Text>}
          </Content>

          <Actions>
            {primaryCta && <Button to={primaryCta.to}>{primaryCta.label}</Button>}
            {secondaryCta && (
              <Button to={secondaryCta.to} variant="ghost">
                {secondaryCta.label}
              </Button>
            )}
          </Actions>
        </Card>
      </Container>
    </Section>
  );
}
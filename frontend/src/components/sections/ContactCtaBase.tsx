import styled from "styled-components";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { media } from "../../styles/breakpoints";

type CtaLink = {
  label: string;
  to: string;
};

type ContactCtaBaseProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
};

const Section = styled.section`
  padding: 1rem 0 5rem;
  scroll-margin-top: 92px;
`;

const Card = styled.div`
  padding: 1.5rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  background:
    linear-gradient(
      180deg,
      ${({ theme }) => theme.colors.secondarySoft},
      transparent
    ),
    ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.md};
  display: grid;
  gap: 1rem;
  transition:
    transform ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default},
    box-shadow ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 14px 32px ${({ theme }) => theme.colors.secondaryGlow};
  }

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
  gap: 0.75rem;
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
    justify-content: flex-start;
  }

  @media ${media.laptop} {
    justify-content: flex-end;
  }

  & > * {
    width: 100%;

    @media ${media.tablet} {
      width: auto;
    }
  }
`;

export function ContactCtaBase({
  id,
  eyebrow = "Próximo passo",
  title = "Vamos conversar sobre o seu projeto?",
  description = "Preencha o formulário para solicitar sua proposta e dar o primeiro passo para um projeto pensado com identidade, sensibilidade e propósito.",
  primaryCta = { label: "Solicitar proposta", to: "/contato" },
  secondaryCta,
}: ContactCtaBaseProps) {
  return (
    <Section id={id}>
      <Container>
        <Card>
          <Content>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && <Title>{title}</Title>}
            {description && <Text>{description}</Text>}
          </Content>

          <Actions>
            {primaryCta && <Button to={primaryCta.to}>{primaryCta.label}</Button>}
            {secondaryCta && (
              <Button to={secondaryCta.to} variant="ghostLight">
                {secondaryCta.label}
              </Button>
            )}
          </Actions>
        </Card>
      </Container>
    </Section>
  );
}

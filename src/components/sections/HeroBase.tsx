import styled from "styled-components";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { media } from "../../styles/breakpoints";

type HighlightItem = {
  title: string;
  text: string;
};

type CtaLink = {
  label: string;
  to: string;
};

type HeroBaseProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  highlights?: HighlightItem[];
  image?: string;
};

const Section = styled.section`
  position: relative;
  padding: 1.5rem 0 3.5rem;

  @media ${media.tablet} {
    padding: 2rem 0 4rem;
  }

  @media ${media.laptop} {
    padding: 4rem 0 6rem;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  align-items: center;

  @media ${media.tablet} {
    gap: 2rem;
  }

  @media ${media.laptop} {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 3rem;
  }
`;

const Content = styled.div`
  display: grid;
  gap: 1rem;

  @media ${media.tablet} {
    gap: 1.2rem;
  }
`;

const Eyebrow = styled.span`
  display: inline-flex;
  width: fit-content;
  padding: 0.4rem 0.8rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(184, 111, 82, 0.12);
  border: 1px solid rgba(184, 111, 82, 0.3);
  color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  text-transform: uppercase;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 7vw, 4.8rem);
  line-height: 1;
  letter-spacing: -0.04em;
  text-wrap: balance;

  @media ${media.tablet} {
    line-height: 0.96;
  }
`;

const Description = styled.p`
  max-width: 600px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.textSoft};

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const Actions = styled.div`
  display: grid;
  gap: 0.75rem;
  margin-top: 0.25rem;

  @media ${media.mobile} {
    grid-template-columns: 1fr;
  }

  @media ${media.tablet} {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  & > * {
    width: 100%;

    @media ${media.tablet} {
      width: auto;
    }
  }
`;

const Highlights = styled.div`
  display: grid;
  gap: 0.75rem;
  margin-top: 0.5rem;

  @media ${media.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Highlight = styled.div`
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const HighlightTitle = styled.strong`
  display: block;
  margin-bottom: 0.3rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.35;
`;

const HighlightText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;
`;

const Visual = styled.div`
  display: grid;
`;

const VisualCard = styled.div`
  position: relative;
  min-height: 260px;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.05),
      rgba(0, 0, 0, 0.25)
    );
  }

  @media ${media.tablet} {
    min-height: 340px;
  }

  @media ${media.laptop} {
    min-height: 420px;
  }
`;

const VisualImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Placeholder = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: center;
  padding: 1rem;
`;

export function HeroBase({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  highlights = [],
  image,
}: HeroBaseProps) {
  return (
    <Section>
      <Container>
        <Grid>
          <Content>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && <Title>{title}</Title>}
            {description && <Description>{description}</Description>}

            <Actions>
              {primaryCta && (
                <Button to={primaryCta.to}>{primaryCta.label}</Button>
              )}
              {secondaryCta && (
                <Button to={secondaryCta.to} variant="ghost">
                  {secondaryCta.label}
                </Button>
              )}
            </Actions>

            {highlights.length > 0 && (
              <Highlights>
                {highlights.map((item, index) => (
                  <Highlight key={index}>
                    <HighlightTitle>{item.title}</HighlightTitle>
                    <HighlightText>{item.text}</HighlightText>
                  </Highlight>
                ))}
              </Highlights>
            )}
          </Content>

          <Visual>
            <VisualCard>
              {image ? (
                <VisualImage src={image} alt="" />
              ) : (
                <Placeholder>Imagem do projeto ou ambiente</Placeholder>
              )}
            </VisualCard>
          </Visual>
        </Grid>
      </Container>
    </Section>
  );
}
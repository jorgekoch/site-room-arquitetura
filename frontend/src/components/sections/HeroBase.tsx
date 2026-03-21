import { useEffect, useMemo, useState } from "react";
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
  slides?: string[];
};

const AUTOPLAY_INTERVAL = 5000;

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
  gap: 1.2rem;

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
  border: 1px solid rgba(184, 111, 82, 0.28);
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  text-transform: uppercase;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 7vw, 4.8rem);
  line-height: 1.12;
  letter-spacing: -0.02em;
  max-width: 720px;
  text-wrap: balance;

  @media ${media.tablet} {
    line-height: 0.96;
  }
`;

const Description = styled.p`
  max-width: 520px;
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
  transition:
    transform ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default},
    background ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.secondary};
    background: ${({ theme }) => theme.colors.surfaceHover};
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
    pointer-events: none;
  }

  @media ${media.tablet} {
    min-height: 340px;
  }

  @media ${media.laptop} {
    min-height: 420px;
  }
`;

const SlideLayer = styled.div`
  position: absolute;
  inset: 0;
`;

const SlideImage = styled.img<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.8s ease;
`;

const StaticImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const Placeholder = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: center;
  padding: 1rem;
  min-height: inherit;
  display: grid;
  place-items: center;
`;

const Controls = styled.div`
  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: 1rem;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const ArrowGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ArrowButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(0, 0, 0, 0.28);
  color: #fff;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition:
    transform ${({ theme }) => theme.transitions.default},
    background ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-1px);
    background: rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.34);
  }
`;

const Dots = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "26px" : "9px")};
  height: 9px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 0;
  padding: 0;
  background: ${({ $active }) =>
    $active ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.42)"};
  cursor: pointer;
  transition:
    width 0.25s ease,
    background 0.25s ease,
    transform 0.25s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

export function HeroBase({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  highlights = [],
  image,
  slides = [],
}: HeroBaseProps) {
  const validSlides = useMemo(
    () => slides.filter((slide) => Boolean(slide)),
    [slides]
  );

  const hasSlides = validSlides.length > 0;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!hasSlides || validSlides.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % validSlides.length);
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(interval);
  }, [hasSlides, validSlides.length]);

  useEffect(() => {
    if (currentSlide > validSlides.length - 1) {
      setCurrentSlide(0);
    }
  }, [currentSlide, validSlides.length]);

  function handlePrevSlide() {
    if (!hasSlides) return;

    setCurrentSlide((prev) =>
      prev === 0 ? validSlides.length - 1 : prev - 1
    );
  }

  function handleNextSlide() {
    if (!hasSlides) return;

    setCurrentSlide((prev) => (prev + 1) % validSlides.length);
  }

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
              {hasSlides ? (
                <>
                  <SlideLayer>
                    {validSlides.map((slide, index) => (
                      <SlideImage
                        key={`${slide}-${index}`}
                        src={slide}
                        alt=""
                        $active={index === currentSlide}
                      />
                    ))}
                  </SlideLayer>

                  {validSlides.length > 1 && (
                    <Controls>
                      <ArrowGroup>
                        <ArrowButton
                          type="button"
                          onClick={handlePrevSlide}
                          aria-label="Imagem anterior"
                        >
                          ‹
                        </ArrowButton>

                        <ArrowButton
                          type="button"
                          onClick={handleNextSlide}
                          aria-label="Próxima imagem"
                        >
                          ›
                        </ArrowButton>
                      </ArrowGroup>

                      <Dots>
                        {validSlides.map((_, index) => (
                          <Dot
                            key={index}
                            type="button"
                            $active={index === currentSlide}
                            onClick={() => setCurrentSlide(index)}
                            aria-label={`Ir para imagem ${index + 1}`}
                          />
                        ))}
                      </Dots>
                    </Controls>
                  )}
                </>
              ) : image ? (
                <StaticImage src={image} alt="" />
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
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { media } from "../../styles/breakpoints";

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
  slides?: string[];
};

const AUTOPLAY_INTERVAL = 5000;

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 7.5rem 0 4rem;

  @media ${media.tablet} {
    padding: 8.5rem 0 4.5rem;
  }

  @media ${media.laptop} {
    padding: 9rem 0 5.5rem;
  }
`;

const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const BackgroundImage = styled.img<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: ${({ $active }) => ($active ? "scale(1)" : "scale(1.03)")};
  transition:
    opacity 1.1s ease,
    transform 6s ease;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(
      90deg,
      rgba(8, 12, 11, 0.84) 0%,
      rgba(8, 12, 11, 0.74) 24%,
      rgba(8, 12, 11, 0.48) 56%,
      rgba(8, 12, 11, 0.54) 100%
    ),
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.16) 0%,
      rgba(0, 0, 0, 0.38) 100%
    );
`;

const ContentWrap = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
`;

const Content = styled.div`
  display: grid;
  gap: 1.5rem;
  width: 100%;

  @media ${media.laptop} {
    grid-template-columns: minmax(0, 1.15fr) minmax(220px, 0.85fr);
    align-items: start;
  }
`;

const Eyebrow = styled.span`
  display: inline-flex;
  width: fit-content;
  padding: 0.45rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.secondarySoft};
  border: 1px solid ${({ theme }) => theme.colors.secondaryBorder};
  color: ${({ theme }) => theme.colors.secondaryContrast};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);

  @media ${media.laptop} {
    grid-column: 1 / 2;
  }
`;

const Title = styled.h1`
  width: 100%;
  max-width: none;
  font-size: clamp(2.9rem, 8vw, 6.4rem);
  line-height: 0.94;
  letter-spacing: -0.05em;
  text-wrap: balance;
  color: ${({ theme }) => theme.colors.primaryContrast};
  text-shadow: 0 10px 32px rgba(0, 0, 0, 0.24);

  @media ${media.laptop} {
    grid-column: 1 / -1;
  }
`;

const Description = styled.p`
  max-width: 560px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.85;
  color: rgba(247, 243, 235, 0.82);
  text-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);

  @media ${media.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  @media ${media.laptop} {
    max-width: 640px;
    grid-column: 1 / 2;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 0.25rem;

  & > * {
    width: 100%;

    @media ${media.tablet} {
      width: auto;
    }
  }

  @media ${media.laptop} {
    grid-column: 1 / 2;
  }
`;

const SlideMeta = styled.div`
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  width: fit-content;
  padding: 0.55rem 0.7rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(10, 16, 13, 0.36);
  border: 1px solid ${({ theme }) => theme.colors.primaryBorder};
  backdrop-filter: blur(10px);

  @media ${media.laptop} {
    grid-column: 1 / 2;
  }
`;

const SlideCount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: rgba(247, 243, 235, 0.8);
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const Dots = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => ($active ? "26px" : "9px")};
  height: 9px;
  border-radius: 999px;
  border: 0;
  padding: 0;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.secondaryContrast : "rgba(247, 243, 235, 0.38)"};
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
  slides = [],
}: HeroBaseProps) {
  const validSlides = useMemo(
    () => slides.filter((slide) => Boolean(slide)),
    [slides]
  );

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (validSlides.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % validSlides.length);
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(interval);
  }, [validSlides.length]);

  useEffect(() => {
    if (currentSlide > validSlides.length - 1) {
      setCurrentSlide(0);
    }
  }, [currentSlide, validSlides.length]);

  return (
    <Section id="topo">
      {validSlides.length > 0 && (
        <BackgroundLayer>
          {validSlides.map((slide, index) => (
            <BackgroundImage
              key={`${slide}-${index}`}
              src={slide}
              alt=""
              $active={index === currentSlide}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </BackgroundLayer>
      )}

      <Overlay />

      <ContentWrap>
        <Container>
          <Content>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && <Title>{title}</Title>}
            {description && <Description>{description}</Description>}

            <Actions>
              {primaryCta && (
                <Button to={primaryCta.to}>{primaryCta.label}</Button>
              )}

              {secondaryCta && (
                <Button to={secondaryCta.to} variant="ghostLight" contrastText>
                  {secondaryCta.label}
                </Button>
              )}
            </Actions>

            {validSlides.length > 1 && (
              <SlideMeta>
                <SlideCount>
                  {String(currentSlide + 1).padStart(2, "0")} /{" "}
                  {String(validSlides.length).padStart(2, "0")}
                </SlideCount>

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
              </SlideMeta>
            )}
          </Content>
        </Container>
      </ContentWrap>
    </Section>
  );
}

import { useEffect, useState } from "react";
import styled from "styled-components";
import { media } from "../../styles/breakpoints";

type Props = {
  open: boolean;
  onClose: () => void;
  images: string[];
  title: string;
  location?: string;
  description?: string;
};

export function PortfolioModal({
  open,
  onClose,
  images,
  title,
  location,
  description,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (!images.length) return;

      if (event.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }

      if (event.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, images]);

  useEffect(() => {
    if (!open) return;
    setCurrentIndex(0);
  }, [open, title]);

  useEffect(() => {
    if (!images.length) {
      setCurrentIndex(0);
      return;
    }

    if (currentIndex > images.length - 1) {
      setCurrentIndex(0);
    }
  }, [images, currentIndex]);

  if (!open) return null;

  const hasImages = images.length > 0;
  const currentImage = hasImages ? images[currentIndex] : "";

  function handlePrev() {
    if (!hasImages) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function handleNext() {
    if (!hasImages) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }

  return (
    <Overlay onClick={onClose} aria-modal="true" role="dialog">
      <Content onClick={(event) => event.stopPropagation()}>
        <Header>
          <HeaderText>
            <Title>{title}</Title>
            {location && <Location>{location}</Location>}
            {description && <Description>{description}</Description>}
          </HeaderText>

          <CloseButton type="button" onClick={onClose} aria-label="Fechar galeria">
            ✕
          </CloseButton>
        </Header>

        {hasImages ? (
          <GalleryShell>
            <MainImageCard>
              <MainImage src={currentImage} alt={`${title} ${currentIndex + 1}`} />

              {images.length > 1 && (
                <>
                  <NavButton
                    type="button"
                    onClick={handlePrev}
                    aria-label="Imagem anterior"
                    $left
                  >
                    ‹
                  </NavButton>

                  <NavButton
                    type="button"
                    onClick={handleNext}
                    aria-label="Próxima imagem"
                  >
                    ›
                  </NavButton>

                  <Counter>
                    {currentIndex + 1} / {images.length}
                  </Counter>
                </>
              )}
            </MainImageCard>

            {images.length > 1 && (
              <ThumbGrid>
                {images.map((img, index) => (
                  <ThumbButton
                    key={`${img}-${index}`}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    $active={index === currentIndex}
                    aria-label={`Ver imagem ${index + 1}`}
                  >
                    <ThumbImage
                      src={img}
                      alt={`${title} miniatura ${index + 1}`}
                      loading="lazy"
                    />
                  </ThumbButton>
                ))}
              </ThumbGrid>
            )}
          </GalleryShell>
        ) : (
          <EmptyState>Nenhuma imagem disponível para este projeto.</EmptyState>
        )}
      </Content>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(7, 10, 9, 0.82);
  display: grid;
  place-items: center;
  padding: 1rem;
  z-index: 1000;
`;

const Content = styled.div`
  width: min(1100px, 100%);
  max-height: 92vh;
  overflow: auto;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.md};
  padding: 1rem;

  @media ${media.tablet} {
    padding: 1.25rem;
  }

  @media ${media.laptop} {
    padding: 1.5rem;
  }
`;

const Header = styled.div`
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;

  @media ${media.tablet} {
    grid-template-columns: 1fr auto;
    align-items: start;
  }
`;

const HeaderText = styled.div`
  display: grid;
  gap: 0.35rem;
`;

const Title = styled.h3`
  font-size: clamp(1.4rem, 3vw, 2rem);
  line-height: 1.08;
`;

const Location = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;
  max-width: 780px;
`;

const CloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition:
    background ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default},
    color ${({ theme }) => theme.transitions.default};

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    border-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const GalleryShell = styled.div`
  display: grid;
  gap: 1rem;
`;

const MainImageCard = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const MainImage = styled.img`
  width: 100%;
  height: min(70vh, 620px);
  object-fit: cover;
  display: block;

  @media ${media.tablet} {
    height: min(72vh, 680px);
  }
`;

const NavButton = styled.button<{ $left?: boolean }>`
  position: absolute;
  top: 50%;
  ${({ $left }) => ($left ? "left: 1rem;" : "right: 1rem;")}
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(0, 0, 0, 0.28);
  color: #fff;
  cursor: pointer;
  backdrop-filter: blur(6px);
  z-index: 2;
  transition:
    transform ${({ theme }) => theme.transitions.default},
    background ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-50%) scale(1.03);
    background: rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.34);
  }
`;

const Counter = styled.div`
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  z-index: 2;
  padding: 0.45rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(0, 0, 0, 0.34);
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  backdrop-filter: blur(6px);
`;

const ThumbGrid = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fill, minmax(92px, 1fr));

  @media ${media.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  }
`;

const ThumbButton = styled.button<{ $active: boolean }>`
  all: unset;
  cursor: pointer;
  display: block;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  border: 2px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.secondary : theme.colors.border};
  transform: ${({ $active }) => ($active ? "translateY(-1px)" : "none")};
  transition:
    border-color ${({ theme }) => theme.transitions.default},
    transform ${({ theme }) => theme.transitions.default},
    opacity ${({ theme }) => theme.transitions.default};
  opacity: ${({ $active }) => ($active ? 1 : 0.88)};

  &:hover {
    opacity: 1;
    transform: translateY(-1px);
  }
`;

const ThumbImage = styled.img`
  width: 100%;
  height: 84px;
  object-fit: cover;
  display: block;

  @media ${media.tablet} {
    height: 92px;
  }
`;

const EmptyState = styled.div`
  display: grid;
  place-items: center;
  min-height: 220px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  padding: 1rem;
`;
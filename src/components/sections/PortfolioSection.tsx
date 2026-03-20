import { useState } from "react";
import styled from "styled-components";
import { Container } from "../ui/Container";
import { SectionHeader } from "./SectionHeader";
import { media } from "../../styles/breakpoints";

type PortfolioItem = {
  title: string;
  location: string;
  description: string;
  cover?: string;
  images: string[];
};

type PortfolioSectionProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: PortfolioItem[];
};

const Section = styled.section`
  padding: 1rem 0 5rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${media.laptop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.button`
  all: unset;
  display: block;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
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

const Cover = styled.div`
  height: 220px;
  background: ${({ theme }) => theme.colors.surfaceSoft};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CoverPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: center;
  padding: 1rem;
`;

const Content = styled.div`
  padding: 1rem;
  display: grid;
  gap: 0.4rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.1rem;
  line-height: 1.2;
`;

const Location = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ProjectDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.7;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(7, 10, 9, 0.72);
  display: grid;
  place-items: center;
  padding: 1rem;
  z-index: 1000;
`;

const ModalCard = styled.div`
  width: min(980px, 100%);
  max-height: 90vh;
  overflow: auto;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const ModalHeader = styled.div`
  display: grid;
  gap: 0.35rem;
  padding: 1.25rem 1.25rem 0;
`;

const ModalTitle = styled.h3`
  font-size: clamp(1.35rem, 3vw, 2rem);
  line-height: 1.1;
`;

const ModalLocation = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ModalDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;
`;

const ModalBody = styled.div`
  padding: 1.25rem;
`;

const Gallery = styled.div`
  display: grid;
  gap: 1rem;

  @media ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  display: block;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const GalleryPlaceholder = styled.div`
  display: grid;
  place-items: center;
  min-height: 240px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  padding: 1rem;
`;

const CloseButton = styled.button`
  margin: 0 1.25rem 1.25rem auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
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

export function PortfolioSection({
  eyebrow = "Projetos",
  title = "Projetos selecionados",
  description = "Casas pensadas a partir da escuta, do lugar e da identidade de quem vive cada espaço.",
  items = [],
}: PortfolioSectionProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  return (
    <Section id="portfolio">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <Grid>
          {items.map((item, index) => (
            <Card key={index} onClick={() => setSelectedProject(item)}>
              <Cover>
                {item.cover ? (
                  <CoverImage src={item.cover} alt={item.title} />
                ) : (
                  <CoverPlaceholder>Imagem de capa do projeto</CoverPlaceholder>
                )}
              </Cover>

              <Content>
                <ProjectTitle>{item.title}</ProjectTitle>
                <Location>{item.location}</Location>
                <ProjectDescription>{item.description}</ProjectDescription>
              </Content>
            </Card>
          ))}
        </Grid>
      </Container>

      {selectedProject && (
        <ModalOverlay onClick={() => setSelectedProject(null)}>
          <ModalCard onClick={(event) => event.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{selectedProject.title}</ModalTitle>
              <ModalLocation>{selectedProject.location}</ModalLocation>
              <ModalDescription>{selectedProject.description}</ModalDescription>
            </ModalHeader>

            <ModalBody>
              {selectedProject.images.length > 0 ? (
                <Gallery>
                  {selectedProject.images.map((image, index) => (
                    <GalleryImage
                      key={index}
                      src={image}
                      alt={`${selectedProject.title} ${index + 1}`}
                    />
                  ))}
                </Gallery>
              ) : (
                <GalleryPlaceholder>
                  Adicione as principais imagens deste projeto no array{" "}
                  <strong>images</strong>.
                </GalleryPlaceholder>
              )}
            </ModalBody>

            <CloseButton onClick={() => setSelectedProject(null)}>
              Fechar
            </CloseButton>
          </ModalCard>
        </ModalOverlay>
      )}
    </Section>
  );
}
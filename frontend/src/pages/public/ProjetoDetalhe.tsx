import { useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { Container } from "../../components/ui/Container";
import { media } from "../../styles/breakpoints";
import { usePublicProject } from "../../hooks/usePublicProjects";

const Section = styled.section`
  padding: 2rem 0 5rem;

  @media ${media.tablet} {
    padding: 2.5rem 0 5.5rem;
  }

  @media ${media.laptop} {
    padding: 3rem 0 6rem;
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 1.4rem;
  color: ${({ theme }) => theme.colors.textSoft};
  text-decoration: none;
  font-weight: 600;
  transition: color ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Hero = styled.div`
  display: grid;
  gap: 1.25rem;
  margin-bottom: 2rem;

  @media ${media.laptop} {
    grid-template-columns: 0.95fr 1.05fr;
    align-items: end;
    gap: 2rem;
    margin-bottom: 2.5rem;
  }
`;

const HeroContent = styled.div`
  display: grid;
  gap: 0.85rem;
  align-content: start;
`;

const Eyebrow = styled.span`
  display: inline-flex;
  width: fit-content;
  padding: 0.42rem 0.85rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.secondarySoft};
  border: 1px solid ${({ theme }) => theme.colors.secondaryBorder};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.02;
  letter-spacing: -0.03em;
  max-width: 720px;
  text-wrap: balance;
`;

const Meta = styled.div`
  display: grid;
  gap: 0.45rem;
`;

const DetailsSection = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 0.5rem;

  @media ${media.laptop} {
    grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
    align-items: start;
  }
`;

const InfoCard = styled.div`
  padding: 1.25rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const CardTitle = styled.h3`
  font-size: 1.05rem;
  margin-bottom: 1rem;
`;

const InfoList = styled.dl`
  display: grid;
  gap: 0.8rem;
  margin: 0;
`;

const InfoItem = styled.div`
  display: grid;
  gap: 0.2rem;
`;

const InfoLabel = styled.dt`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const InfoValue = styled.dd`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

const DescriptionSection = styled.div`
  margin-top: 1.5rem;
  width: 100%;
`;

const DescriptionCard = styled.div`
  padding: 1.25rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const DescriptionText = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.85;
  margin: 0.75rem 0 0;
`;

const VideoCard = styled.div`
  padding: 1.25rem;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  display: grid;
  gap: 0.8rem;
`;

const VideoFrame = styled.iframe`
  width: 100%;
  aspect-ratio: 16 / 9;
  min-height: 260px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surfaceHover};
`;

const HeroImageCard = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.md};

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.03),
      rgba(0, 0, 0, 0.18)
    );
    pointer-events: none;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;

  @media ${media.tablet} {
    height: 440px;
  }

  @media ${media.laptop} {
    height: 560px;
  }
`;

const GallerySection = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
`;

const GalleryHeader = styled.div`
  display: grid;
  gap: 0.35rem;
`;

const GalleryTitle = styled.h2`
  font-size: clamp(1.35rem, 3vw, 2rem);
  line-height: 1.08;
`;

const GalleryText = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;
`;

const Gallery = styled.div`
  display: grid;
  gap: 1rem;

  @media ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const GalleryImageCard = styled.button`
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 0;
  cursor: pointer;
  transition:
    transform ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  display: block;

  @media ${media.tablet} {
    height: 320px;
  }

  @media ${media.laptop} {
    height: 360px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  width: min(100%, 1120px);
  max-height: 90vh;
  display: grid;
  gap: 1rem;
`;

const ModalImageFrame = styled.div`
  width: 100%;
  height: min(78vh, 760px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;

const ModalControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const ModalButton = styled.button`
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(255, 255, 255, 0.95);
  color: ${({ theme }) => theme.colors.text};
  padding: 0.7rem 1rem;
  font-weight: 700;
  cursor: pointer;
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 2rem 0 1rem;

  @media ${media.laptop} {
    margin: 3rem 0 1.5rem;
  }
`;

const MoreProjectsSection = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const MoreProjectsHeader = styled.div`
  display: grid;
  gap: 0.35rem;
`;

const MoreProjectsTitle = styled.h2`
  font-size: clamp(1.4rem, 3vw, 2rem);
  line-height: 1.08;
`;

const MoreProjectsText = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;
`;

const ProjectCard = styled(Link)`
  display: grid;
  grid-template-rows: auto 1fr;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition:
    transform ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default},
    background ${({ theme }) => theme.transitions.default},
    box-shadow ${({ theme }) => theme.transitions.default};
  box-shadow: ${({ theme }) => theme.shadow.sm};

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ theme }) => theme.colors.secondary};
    background: ${({ theme }) => theme.colors.surfaceHover};
    box-shadow: ${({ theme }) => theme.shadow.md};
  }

  &:hover img {
    transform: scale(1.03);
  }
`;

const ProjectCardContent = styled.div`
  padding: 1rem;
  display: grid;
  gap: 0.45rem;
`;

const ProjectCardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;
`;

const ProjectCardDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.7;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const ExploreText = styled.span`
  margin-top: 0.2rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
`;

function getYouTubeEmbedUrl(url?: string | null) {
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === "youtu.be") {
      const videoId = parsedUrl.pathname.replace("/", "");

      return videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : null;
    }

    if (
      parsedUrl.hostname === "www.youtube.com" ||
      parsedUrl.hostname === "youtube.com" ||
      parsedUrl.hostname === "m.youtube.com"
    ) {
      const videoId = parsedUrl.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      const pathParts = parsedUrl.pathname.split("/").filter(Boolean);

      if (
        pathParts[0] === "shorts" &&
        pathParts[1]
      ) {
        return `https://www.youtube.com/embed/${pathParts[1]}`;
      }

      if (
        pathParts[0] === "embed" &&
        pathParts[1]
      ) {
        return `https://www.youtube.com/embed/${pathParts[1]}`;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export default function ProjetoDetalhe() {
  const { slug } =
    useParams<{ slug: string }>();

  const {
    project,
    loading,
    error,
  } = usePublicProject(slug);

  const [
    selectedImage,
    setSelectedImage,
  ] = useState<string | null>(null);

  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState(0);

  const openImage = (
    image: string,
    index: number
  ) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (!project) return;

    const nextIndex =
      selectedIndex > 0
        ? selectedIndex - 1
        : project.images.length - 1;

    setSelectedImage(
      project.images[nextIndex].imageUrl
    );

    setSelectedIndex(nextIndex);
  };

  const goToNext = () => {
    if (!project) return;

    const nextIndex =
      selectedIndex <
      project.images.length - 1
        ? selectedIndex + 1
        : 0;

    setSelectedImage(
      project.images[nextIndex].imageUrl
    );

    setSelectedIndex(nextIndex);
  };

  if (loading) {
    return (
      <Section>
        <Container>
          <BackLink to="/projetos">
            ← Voltar para projetos
          </BackLink>

          <DescriptionCard>
            <DescriptionText>
              Carregando projeto...
            </DescriptionText>
          </DescriptionCard>
        </Container>
      </Section>
    );
  }

  if (error || !project) {
    return (
      <Section>
        <Container>
          <BackLink to="/projetos">
            ← Voltar para projetos
          </BackLink>

          <DescriptionCard>
            <InfoLabel>
              Projeto
            </InfoLabel>

            <DescriptionText>
              {error ||
                "Projeto não encontrado."}
            </DescriptionText>
          </DescriptionCard>
        </Container>
      </Section>
    );
  }

  const galleryImages =
    project.images ?? [];

  const cover =
    project.featuredImage ||
    galleryImages[0]?.imageUrl;

  const videoEmbedUrl =
    getYouTubeEmbedUrl(project.videoUrl);

  return (
    <Section>
      <Container>
        <BackLink to="/projetos">
          ← Voltar para projetos
        </BackLink>

        <Hero>
          <HeroContent>
            <Eyebrow>
              {project.category}
            </Eyebrow>

            <Title>
              {project.title}
            </Title>

            <Meta>
              <DetailsSection>
                <InfoCard>
                  <CardTitle>
                    Informações do projeto
                  </CardTitle>

                  <InfoList>
                    {project.area && (
                      <InfoItem>
                        <InfoLabel>
                          Área
                        </InfoLabel>

                        <InfoValue>
                          {project.area}
                        </InfoValue>
                      </InfoItem>
                    )}

                    {(project.city ||
                      project.state) && (
                      <InfoItem>
                        <InfoLabel>
                          Local
                        </InfoLabel>

                        <InfoValue>
                          {project.city}
                          {project.city &&
                          project.state
                            ? " / "
                            : ""}
                          {project.state}
                        </InfoValue>
                      </InfoItem>
                    )}

                    {project.year && (
                      <InfoItem>
                        <InfoLabel>
                          Ano
                        </InfoLabel>

                        <InfoValue>
                          {project.year}
                        </InfoValue>
                      </InfoItem>
                    )}
                  </InfoList>
                </InfoCard>
              </DetailsSection>
            </Meta>
          </HeroContent>

          <HeroImageCard>
            {cover ? (
              <HeroImage
                src={cover}
                alt={project.title}
              />
            ) : (
              <HeroImage
                src=""
                alt=""
              />
            )}
          </HeroImageCard>
        </Hero>

        <DescriptionSection>
          <DescriptionCard>
            <InfoLabel>
              Descrição
            </InfoLabel>

            <DescriptionText>
              {project.description}
            </DescriptionText>
          </DescriptionCard>
        </DescriptionSection>

                {galleryImages.length > 0 && (
          <GallerySection>
            <GalleryHeader>
              <GalleryTitle>
                Galeria do projeto
              </GalleryTitle>

              <GalleryText>
                Um recorte visual do projeto,
                com imagens que ajudam a
                perceber a atmosfera,
                materialidade e identidade
                do espaço.
              </GalleryText>
            </GalleryHeader>

            <Gallery>
              {galleryImages.map(
                (image, index) => (
                  <GalleryImageCard
                    key={image.id}
                    type="button"
                    onClick={() =>
                      openImage(
                        image.imageUrl,
                        index
                      )
                    }
                    aria-label={`Abrir imagem ${
                      index + 1
                    } de ${
                      project.title
                    }`}
                  >
                    <GalleryImage
                      src={
                        image.imageUrl
                      }
                      alt={
                        image.alt ||
                        `${project.title} ${
                          index + 1
                        }`
                      }
                      loading="lazy"
                    />
                  </GalleryImageCard>
                )
              )}
            </Gallery>
          </GallerySection>
        )}

                {selectedImage && (
          <ModalOverlay
            onClick={closeImage}
          >
            <ModalContent
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <ModalImageFrame>
                <ModalImage
                  src={selectedImage}
                  alt={project.title}
                />
              </ModalImageFrame>

              <ModalControls>
                <ModalButton
                  type="button"
                  onClick={goToPrevious}
                  disabled={
                    galleryImages.length <= 1
                  }
                >
                  ← Anterior
                </ModalButton>

                <span
                  style={{
                    color: "#fff",
                  }}
                >
                  {selectedIndex + 1} /{" "}
                  {galleryImages.length}
                </span>

                <ModalButton
                  type="button"
                  onClick={goToNext}
                  disabled={
                    galleryImages.length <= 1
                  }
                >
                  Próxima →
                </ModalButton>
              </ModalControls>
            </ModalContent>
          </ModalOverlay>
        )}

        {videoEmbedUrl && (
          <VideoCard>
            <CardTitle>
              Vídeo do projeto
            </CardTitle>

            <VideoFrame
              src={videoEmbedUrl}
              title={`Vídeo do projeto ${project.title}`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </VideoCard>
        )}

        <Divider />

        <MoreProjectsSection>
          <MoreProjectsHeader>
            <MoreProjectsTitle>
              Mais projetos
            </MoreProjectsTitle>

            <MoreProjectsText>
              Continue explorando outros
              projetos desenvolvidos pela
              ROOM.
            </MoreProjectsText>
          </MoreProjectsHeader>

          <ProjectCard
            to="/projetos"
          >
            <ProjectCardContent>
              <ProjectCardTitle>
                Ver todos os projetos
              </ProjectCardTitle>

              <ProjectCardDescription>
                Conheça todos os projetos
                publicados pela ROOM
                Arquitetura Sustentável.
              </ProjectCardDescription>

              <ExploreText>
                Explorar projetos →
              </ExploreText>
            </ProjectCardContent>
          </ProjectCard>
        </MoreProjectsSection>
      </Container>
    </Section>
  );
}

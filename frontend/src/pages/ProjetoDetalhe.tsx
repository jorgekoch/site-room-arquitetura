import styled from "styled-components";
import { Link, Navigate, useParams } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { portfolioData } from "../data/portfolio";
import { media } from "../styles/breakpoints";

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
  background: rgba(184, 111, 82, 0.12);
  border: 1px solid rgba(184, 111, 82, 0.26);
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

const Location = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.85;
  max-width: 720px;
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

const GalleryImageCard = styled.div`
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.sm};
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

const MoreProjectsGrid = styled.div`
  display: grid;
  gap: 1rem;

  @media ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${media.laptop} {
    grid-template-columns: repeat(3, 1fr);
  }
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

const ProjectCardImageWrap = styled.div`
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ProjectCardImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  transition: transform ${({ theme }) => theme.transitions.default};
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

const ProjectCardLocation = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.xs};
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

export default function ProjetoDetalhe() {
  const { slug } = useParams<{ slug: string }>();

  const project = portfolioData.items.find((item) => item.slug === slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const otherProjects = portfolioData.items.filter((item) => item.slug !== slug);

  return (
    <Section>
      <Container>
        <BackLink to="/#portfolio">← Voltar para projetos</BackLink>

        <Hero>
          <HeroContent>
            <Eyebrow>Projeto</Eyebrow>

            <Title>{project.title}</Title>

            <Meta>
              <Location>{project.location}</Location>
              <Description>{project.description}</Description>
            </Meta>
          </HeroContent>

          <HeroImageCard>
            <HeroImage
              src={project.cover || project.images[0]}
              alt={project.title}
            />
          </HeroImageCard>
        </Hero>

        <GallerySection>
          <GalleryHeader>
            <GalleryTitle>Galeria do projeto</GalleryTitle>
            <GalleryText>
              Um recorte visual do projeto, com imagens que ajudam a perceber
              atmosfera, materialidade e identidade do espaço.
            </GalleryText>
          </GalleryHeader>

          <Gallery>
            {project.images.map((image, index) => (
              <GalleryImageCard key={`${project.slug}-${index}`}>
                <GalleryImage
                  src={image}
                  alt={`${project.title} ${index + 1}`}
                  loading="lazy"
                />
              </GalleryImageCard>
            ))}
          </Gallery>
        </GallerySection>

        <Divider />

        <MoreProjectsSection>
          <MoreProjectsHeader>
            <MoreProjectsTitle>Mais projetos</MoreProjectsTitle>
            <MoreProjectsText>
              Continue explorando outros projetos desenvolvidos pela ROOM.
            </MoreProjectsText>
          </MoreProjectsHeader>

          <MoreProjectsGrid>
            {otherProjects.map((item) => (
              <ProjectCard key={item.slug} to={`/projetos/${item.slug}`}>
                <ProjectCardImageWrap>
                  <ProjectCardImage
                    src={item.cover || item.images[0]}
                    alt={item.title}
                    loading="lazy"
                  />
                </ProjectCardImageWrap>

                <ProjectCardContent>
                  <ProjectCardTitle>{item.title}</ProjectCardTitle>
                  <ProjectCardLocation>{item.location}</ProjectCardLocation>
                  <ProjectCardDescription>{item.description}</ProjectCardDescription>
                  <ExploreText>Ver projeto →</ExploreText>
                </ProjectCardContent>
              </ProjectCard>
            ))}
          </MoreProjectsGrid>
        </MoreProjectsSection>
      </Container>
    </Section>
  );
}
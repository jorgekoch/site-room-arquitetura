import styled from "styled-components";
import { Helmet } from "react-helmet-async";

import { PortfolioSection } from "../../components/sections/PortfolioSection";
import { SectionHeader } from "../../components/sections/SectionHeader";

import { Reveal } from "../../components/motion/Reveal";

import { Container } from "../../components/ui/Container";

import { media } from "../../styles/breakpoints";

import { usePublicProjects } from "../../hooks/usePublicProjects";

const Page = styled.div`
  padding: 2rem 0 6rem;

  @media ${media.tablet} {
    padding: 2.5rem 0 6.5rem;
  }

  @media ${media.laptop} {
    padding: 3rem 0 7rem;
  }
`;

const ProjectSectionHeader = styled(SectionHeader)`
  h2 {
    font-size: clamp(2.25rem, 4vw, 3.5rem);
    line-height: 1.08;
  }
`;

const ConstructionCard = styled.div`
  display: grid;
  justify-items: center;
  text-align: center;

  padding: 4rem 2rem;

  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};

  background: ${({ theme }) => theme.colors.surface};

  box-shadow: ${({ theme }) => theme.shadow.md};

  @media ${media.tablet} {
    padding: 4.5rem 3rem;
  }
`;

const ConstructionIcon = styled.div`
  display: grid;
  place-items: center;

  width: 3.5rem;
  height: 3.5rem;

  margin-bottom: 1.25rem;

  border-radius: 50%;

  background: ${({ theme }) => theme.colors.backgroundSoft};

  color: ${({ theme }) => theme.colors.secondary};

  font-size: 1.4rem;
`;

const ConstructionTitle = styled.h3`
  margin-bottom: 0.75rem;

  font-size: 1.35rem;
  line-height: 1.3;

  color: ${({ theme }) => theme.colors.text};
`;

const ConstructionText = styled.p`
  max-width: 540px;

  color: ${({ theme }) => theme.colors.textSoft};

  font-size: ${({ theme }) => theme.fontSizes.md};

  line-height: 1.75;
`;

const NoticeBanner = styled.div`
  margin: 0 0 1.5rem;

  padding: 1rem 1.25rem;

  border: 1px solid ${({ theme }) => theme.colors.primaryBorder};

  border-radius: ${({ theme }) => theme.radius.md};

  background: ${({ theme }) => theme.colors.primarySoft};

  color: ${({ theme }) => theme.colors.text};

  font-weight: 600;

  text-align: center;

  @media ${media.tablet} {
    margin-bottom: 2rem;

    padding: 1.125rem 1.5rem;
  }
`;

export default function Projetos() {
  const { projects, loading, error } = usePublicProjects();

  const portfolioItems = projects.map((project) => ({
    slug: project.slug,

    title: project.title,

    category: project.category,

    local:
      project.city && project.state
        ? `${project.city} / ${project.state}`
        : (project.city ?? project.state ?? ""),

    description: project.description,

    cover: project.featuredImage ?? project.images?.[0]?.imageUrl,

    images: project.images?.map((image) => image.imageUrl) ?? [],
  }));

  const hasProjects = !loading && !error && projects.length > 0;
  const isEmpty = !loading && !error && projects.length === 0;

  return (
    <Page>
      <Helmet>
        <title>Projetos — ROOM Arquitetura Sustentável</title>

        <meta
          name="description"
          content="Conheça os projetos residenciais desenvolvidos pela ROOM Arquitetura Sustentável."
        />

        <meta
          property="og:title"
          content="Projetos — ROOM Arquitetura Sustentável"
        />

        <meta
          property="og:description"
          content="Conheça os projetos residenciais desenvolvidos pela ROOM Arquitetura Sustentável."
        />
      </Helmet>

      <Reveal>
        <Container>
          <ProjectSectionHeader
            eyebrow="Projetos"
            title="Projetos selecionados"
            description="Projetos pensados a partir da escuta, do lugar e da identidade de quem vive cada espaço."
          />

          {loading && <NoticeBanner>Carregando projetos...</NoticeBanner>}

          {error && <NoticeBanner>{error}</NoticeBanner>}

          {isEmpty && (
            <ConstructionCard>
              <ConstructionIcon>✦</ConstructionIcon>

              <ConstructionTitle>Em construção</ConstructionTitle>

              <ConstructionText>
                Estamos preparando esta seleção de projetos. Em breve, novos
                trabalhos da ROOM Arquitetura Sustentável estarão aqui.
              </ConstructionText>
            </ConstructionCard>
          )}

          {hasProjects && (
            <PortfolioSection
              items={portfolioItems}
              showFilter={true}
              showHeader={false}
              useSectionContainer={false}
            />
          )}
        </Container>
      </Reveal>
    </Page>
  );
}

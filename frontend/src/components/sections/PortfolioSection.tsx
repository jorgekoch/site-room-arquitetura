import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { SectionHeader } from "./SectionHeader";
import { media } from "../../styles/breakpoints";

type PortfolioItem = {
  slug: string;
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
  scroll-margin-top: 92px;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${media.laptop} {
    grid-template-columns: repeat(3, 1fr);
    align-items: stretch;
  }
`;

const Card = styled(Link)`
  display: grid;
  grid-template-rows: auto 1fr;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-decoration: none;
  transition:
    transform ${({ theme }) => theme.transitions.default},
    border-color ${({ theme }) => theme.transitions.default},
    background ${({ theme }) => theme.transitions.default},
    box-shadow ${({ theme }) => theme.transitions.default};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  height: 100%;

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

const Cover = styled.div`
  position: relative;
  height: 240px;
  background: ${({ theme }) => theme.colors.backgroundSoft};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform ${({ theme }) => theme.transitions.default};
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

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.04),
    rgba(0, 0, 0, 0.26)
  );
  pointer-events: none;
`;

const ViewHint = styled.span`
  position: absolute;
  right: 0.9rem;
  bottom: 0.9rem;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.75rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.28);
  color: #fff;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  backdrop-filter: blur(6px);
`;

const Content = styled.div`
  padding: 1rem;
  display: grid;
  gap: 0.55rem;
  align-content: start;
`;

const TopMeta = styled.div`
  display: grid;
  gap: 0.35rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.12rem;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.text};
`;

const Location = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ProjectDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.72;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BottomMeta = styled.div`
  margin-top: 0.35rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const ImageCount = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ExploreText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
`;

export function PortfolioSection({
  eyebrow = "Projetos",
  title = "Projetos selecionados",
  description = "Casas pensadas a partir da escuta, do lugar e da identidade de quem vive cada espaço.",
  items = [],
}: PortfolioSectionProps) {
  return (
    <Section id="portfolio">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <Grid>
          {items.map((item) => (
            <Card
              key={item.slug}
              to={`/projetos/${item.slug}`}
              aria-label={`Abrir projeto ${item.title}`}
            >
              <Cover>
                {item.cover ? (
                  <CoverImage src={item.cover} alt={item.title} loading="lazy" />
                ) : (
                  <CoverPlaceholder>Imagem de capa do projeto</CoverPlaceholder>
                )}

                <ImageOverlay />
                <ViewHint>Ver projeto</ViewHint>
              </Cover>

              <Content>
                <TopMeta>
                  <ProjectTitle>{item.title}</ProjectTitle>
                  <Location>{item.location}</Location>
                </TopMeta>

                <ProjectDescription>{item.description}</ProjectDescription>

                <BottomMeta>
                  <ImageCount>
                    {item.images.length} {item.images.length === 1 ? "imagem" : "imagens"}
                  </ImageCount>
                  <ExploreText>Explorar →</ExploreText>
                </BottomMeta>
              </Content>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
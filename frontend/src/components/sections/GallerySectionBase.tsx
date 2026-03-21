import styled from "styled-components";
import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { Tag } from "../ui/Tag";
import { SectionHeader } from "./SectionHeader";
import { media } from "../../styles/breakpoints";

type GalleryItem = {
  tag?: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  link?: {
    label: string;
    href: string;
    target?: string;
    rel?: string;
  };
};

type GallerySectionBaseProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: GalleryItem[];
};

const Section = styled.section`
  padding: 1rem 0 4rem;

  @media ${media.laptop} {
    padding: 1rem 0 5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${media.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const GalleryCard = styled(Card)`
  padding: 0;
  overflow: hidden;
  display: grid;
  align-content: start;
`;

const Media = styled.div`
  position: relative;
  width: 100%;
  min-height: 220px;
  background: ${({ theme }) => theme.colors.backgroundSoft};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media ${media.tablet} {
    min-height: 240px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  min-height: 220px;
  object-fit: cover;
  display: block;

  @media ${media.tablet} {
    min-height: 240px;
  }
`;

const Placeholder = styled.div`
  width: 100%;
  min-height: 220px;
  display: grid;
  place-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 1.5rem;

  @media ${media.tablet} {
    min-height: 240px;
  }
`;

const Content = styled.div`
  display: grid;
  gap: 0.8rem;
  padding: 1.1rem;

  @media ${media.tablet} {
    padding: 1.25rem;
  }
`;

const Title = styled.h3`
  font-size: 1.08rem;
  line-height: 1.3;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;
`;

const Link = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: color ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export function GallerySectionBase({
  eyebrow = "Galeria",
  title = "Uma estrutura para apresentar imagens, projetos ou portfólio",
  description = "Use esta seção para mostrar trabalhos, registros visuais, fotos profissionais ou qualquer material que ajude a reforçar sua proposta.",
  items = [],
}: GallerySectionBaseProps) {
  return (
    <Section>
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />

        <Grid>
          {items.map((item, index) => (
            <GalleryCard key={index}>
              <Media>
                {item.image ? (
                  <Image src={item.image} alt={item.imageAlt || item.title || ""} />
                ) : (
                  <Placeholder>Imagem / projeto / portfólio</Placeholder>
                )}
              </Media>

              <Content>
                {item.tag && <Tag>{item.tag}</Tag>}
                {item.title && <Title>{item.title}</Title>}
                {item.description && <Description>{item.description}</Description>}
                {item.link && (
                  <Link
                    href={item.link.href}
                    target={item.link.target || "_blank"}
                    rel={item.link.rel || "noreferrer"}
                  >
                    {item.link.label}
                  </Link>
                )}
              </Content>
            </GalleryCard>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
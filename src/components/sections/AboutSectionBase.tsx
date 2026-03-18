import styled from "styled-components";
import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { Tag } from "../ui/Tag";
import { SectionHeader } from "./SectionHeader";
import { media } from "../../styles/breakpoints";

type AboutSectionBaseProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  mainTag?: string;
  mainTitle?: string;
  paragraphs?: string[];
  bullets?: string[];
  sideTag?: string;
  sideTitle?: string;
  sideItems?: string[];
  image?: string;
  imageAlt?: string;
  showImage?: boolean;
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

  @media ${media.laptop} {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: start;
  }
`;

const Column = styled.div`
  display: grid;
  gap: 1rem;
`;

const HighlightCard = styled(Card)`
  display: grid;
  gap: 1rem;
`;

const Title = styled.h3`
  font-size: clamp(1.35rem, 4vw, 2rem);
  line-height: 1.15;
`;

const SubTitle = styled.h4`
  font-size: 1.05rem;
  line-height: 1.35;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.8;
`;

const BulletList = styled.ul`
  display: grid;
  gap: 0.8rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Bullet = styled.li`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.7;
  padding-left: 1rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.72rem;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const List = styled.ul`
  display: grid;
  gap: 0.85rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.7;
  transition: 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const ImageCard = styled.div`
  position: relative;
  min-height: 260px;
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
      rgba(0, 0, 0, 0.05),
      rgba(0, 0, 0, 0.2)
    );
  }

  @media ${media.tablet} {
    min-height: 340px;
  }

  @media ${media.laptop} {
    min-height: 420px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  min-height: 260px;
  display: grid;
  place-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 1.5rem;
`;

export function AboutSectionBase({
  eyebrow,
  title,
  description,
  mainTag,
  mainTitle,
  paragraphs = [],
  bullets = [],
  sideTag,
  sideTitle,
  sideItems = [],
  image,
  imageAlt = "",
  showImage = true,
}: AboutSectionBaseProps) {
  return (
    <Section>
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <Grid>
          <Column>
            <HighlightCard>
              {mainTag && <Tag>{mainTag}</Tag>}
              {mainTitle && <Title>{mainTitle}</Title>}

              {paragraphs.map((paragraph, index) => (
                <Text key={index}>{paragraph}</Text>
              ))}

              {bullets.length > 0 && (
                <BulletList>
                  {bullets.map((bullet, index) => (
                    <Bullet key={index}>{bullet}</Bullet>
                  ))}
                </BulletList>
              )}
            </HighlightCard>
          </Column>

          <Column>
            {showImage && (
              <ImageCard>
                {image ? (
                  <Image src={image} alt={imageAlt} />
                ) : (
                  <ImagePlaceholder>
                    Imagem do projeto ou ambiente
                  </ImagePlaceholder>
                )}
              </ImageCard>
            )}

            <Card>
              {sideTag && <Tag>{sideTag}</Tag>}
              {sideTitle && <SubTitle>{sideTitle}</SubTitle>}

              {sideItems.length > 0 && (
                <List>
                  {sideItems.map((item, index) => (
                    <Item key={index}>{item}</Item>
                  ))}
                </List>
              )}
            </Card>
          </Column>
        </Grid>
      </Container>
    </Section>
  );
}
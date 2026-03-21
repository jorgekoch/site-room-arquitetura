import styled from "styled-components";
import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { Tag } from "../ui/Tag";
import { SectionHeader } from "./SectionHeader";
import { media } from "../../styles/breakpoints";

type AboutProfileItem = {
  tag: string;
  title: string;
  text: string;
};

type AboutSectionBaseProps = {
  id?: string;
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
  profiles?: AboutProfileItem[];
  image?: string;
  imageAlt?: string;
  showImage?: boolean;
};

const Section = styled.section`
  padding: 1rem 0 4rem;
  scroll-margin-top: 92px;

  @media ${media.laptop} {
    padding: 1rem 0 5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media ${media.laptop} {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: stretch;
  }
`;

const Column = styled.div`
  display: grid;
  gap: 1rem;
  height: 100%;
`;

const HighlightCard = styled(Card)`
  display: grid;
  gap: 1rem;
  height: 100%;
`;

const Title = styled.h3`
  font-size: clamp(1.35rem, 4vw, 2rem);
  line-height: 1.15;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.8;
`;

const BulletGroup = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const BulletGroupTitle = styled.h4`
  font-size: 0.98rem;
  line-height: 1.35;
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
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 0.25rem 0;
`;

const ProfilesGrid = styled.div`
  display: grid;
  gap: 1rem;

  @media ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    align-items: stretch;
  }
`;

const ProfileCard = styled(Card)`
  display: grid;
  gap: 0.75rem;
  height: 100%;
`;

const ProfileTitle = styled.h4`
  font-size: 1rem;
  line-height: 1.35;
`;

const ProfileText = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;
`;

const ImageCard = styled.div`
  position: relative;
  height: 100%;
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
    pointer-events: none;
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
  id,
  eyebrow = "Sobre",
  title = "Uma estrutura clara para apresentar trajetória e diferenciais",
  description = "Use esta seção para apresentar a pessoa, a marca ou a proposta com mais profundidade e confiança.",
  mainTag,
  mainTitle,
  paragraphs = [],
  bullets = [],
  sideTag,
  sideTitle,
  sideItems = [],
  profiles = [],
  image,
  imageAlt = "",
  showImage = true,
}: AboutSectionBaseProps) {
  return (
    <Section id={id}>
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />

        <Grid>
          <Column>
            <HighlightCard>
              {mainTag && <Tag>{mainTag}</Tag>}
              {mainTitle && <Title>{mainTitle}</Title>}

              {paragraphs.map((paragraph, index) => (
                <Text key={index}>{paragraph}</Text>
              ))}

              {bullets.length > 0 && (
                <BulletGroup>
                  <BulletGroupTitle>Destaques da filosofia</BulletGroupTitle>
                  <BulletList>
                    {bullets.map((bullet, index) => (
                      <Bullet key={index}>{bullet}</Bullet>
                    ))}
                  </BulletList>
                </BulletGroup>
              )}

              {sideItems.length > 0 && (
                <>
                  <Divider />
                  <BulletGroup>
                    {(sideTag || sideTitle) && (
                      <BulletGroupTitle>{sideTitle || sideTag}</BulletGroupTitle>
                    )}
                    <BulletList>
                      {sideItems.map((item, index) => (
                        <Bullet key={index}>{item}</Bullet>
                      ))}
                    </BulletList>
                  </BulletGroup>
                </>
              )}
            </HighlightCard>

            {profiles.length > 0 && (
              <ProfilesGrid>
                {profiles.map((profile, index) => (
                  <ProfileCard key={index}>
                    <Tag>{profile.tag}</Tag>
                    <ProfileTitle>{profile.title}</ProfileTitle>
                    <ProfileText>{profile.text}</ProfileText>
                  </ProfileCard>
                ))}
              </ProfilesGrid>
            )}
          </Column>

          <Column>
            {showImage && (
              <ImageCard>
                {image ? (
                  <Image src={image} alt={imageAlt} loading="lazy" />
                ) : (
                  <ImagePlaceholder>
                    Imagem do projeto ou ambiente
                  </ImagePlaceholder>
                )}
              </ImageCard>
            )}
          </Column>
        </Grid>
      </Container>
    </Section>
  );
}
import styled from "styled-components";
import { AboutPageData } from "../../data/about";
import { media } from "../../styles/breakpoints";
import { Container } from "../ui/Container";

type AboutPageSectionProps = { data: AboutPageData };

const Section = styled.section`
  padding: 2rem 0 5.5rem;
  @media ${media.laptop} { padding: 2.5rem 0 7rem; }
`;
const Header = styled.div`
  display: grid;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;
const Eyebrow = styled.span`
  display: inline-flex;
  width: fit-content;
  padding: 0.45rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.secondarySoft};
  border: 1px solid ${({ theme }) => theme.colors.secondaryBorder};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  line-height: 1;
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 3vw, 3rem);
  line-height: 1.12;
  margin: 0;
`;
const ArchitectsTitle = styled.h2`
  font-size: clamp(1.55rem, 2.5vw, 2.4rem);
  line-height: 1.15;
  margin: 4rem 0 1.5rem;
`;
const Row = styled.article<{ $reverse?: boolean }>`
  display: grid;
  gap: 1.5rem;
  align-items: center;
  & + & { margin-top: 2rem; }
  @media ${media.laptop} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 4rem;
    ${({ $reverse }) => $reverse && `> :first-child { order: 2; }`}
  }
`;
const ImageFrame = styled.div`
  aspect-ratio: 4 / 5;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.md};
`;
const Image = styled.img`
  display: block;
  width: 100%; height: 100%; object-fit: cover;
`;
const ImagePlaceholder = styled.div`
  display: grid; place-items: center; width: 100%; height: 100%; padding: 1.5rem;
  color: ${({ theme }) => theme.colors.textMuted}; text-align: center;
`;
const Copy = styled.div`display: grid; gap: 1.15rem;`;
const ProfileName = styled.h3`
  font-size: clamp(1.3rem, 2vw, 1.75rem);
  line-height: 1.25;
`;
const Text = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.8;
`;

function Portrait({ image, imageAlt }: { image?: string; imageAlt: string }) {
  return <ImageFrame>{image ? <Image src={image} alt={imageAlt} loading="lazy" /> : <ImagePlaceholder>{imageAlt}</ImagePlaceholder>}</ImageFrame>;
}

export function AboutPageSection({ data }: AboutPageSectionProps) {
  return (
    <Section><Container>
      <Header>
        <Eyebrow>Sobre</Eyebrow>
        <Title>{data.title}</Title>
      </Header>
      <Row>
        <Portrait image={data.introduction.image} imageAlt={data.introduction.imageAlt} />
        <Copy>{data.introduction.paragraphs.map((paragraph) => <Text key={paragraph}>{paragraph}</Text>)}</Copy>
      </Row>
      {data.architects.profiles.map((profile, index) => (
        <Row key={profile.name} $reverse={index % 2 === 0}>
          <Portrait image={profile.image} imageAlt={profile.imageAlt} />
          <Copy><ProfileName>{profile.name}</ProfileName><Text>{profile.text}</Text></Copy>
        </Row>
      ))}
    </Container></Section>
  );
}

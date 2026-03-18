import styled from "styled-components";
import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { Tag } from "../ui/Tag";
import { Button } from "../ui/Button";
import { SectionHeader } from "./SectionHeader";
import { media } from "../../styles/breakpoints";

type ServiceItem = {
  tag?: string;
  title: string;
  description?: string;
  bullets?: string[];
  cta?: {
    label: string;
    to: string;
    variant?: "primary" | "ghost";
  };
};

type SectionCta = {
  label: string;
  to: string;
};

type ServiceSectionBaseProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: ServiceItem[];
  cta?: SectionCta;
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

  @media ${media.laptop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ServiceCard = styled(Card)`
  display: grid;
  gap: 1rem;
  align-content: start;
`;

const Title = styled.h3`
  font-size: 1.15rem;
  line-height: 1.3;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;
`;

const BulletList = styled.ul`
  display: grid;
  gap: 0.75rem;
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
    top: 0.7rem;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const ActionRow = styled.div`
  margin-top: 0.5rem;

  & > * {
    width: 100%;

    @media ${media.tablet} {
      width: auto;
    }
  }
`;

const SectionAction = styled.div`
  margin-top: 2rem;

  & > * {
    width: 100%;

    @media ${media.tablet} {
      width: auto;
    }
  }
`;

export function ServiceSectionBase({
  eyebrow = "Serviços",
  title = "Uma estrutura clara para apresentar o que você oferece",
  description = "Use esta seção para destacar seus principais serviços, modalidades ou áreas de atuação.",
  items = [],
  cta,
}: ServiceSectionBaseProps) {
  return (
    <Section>
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />

        <Grid>
          {items.map((item, index) => (
            <ServiceCard key={index}>
              {item.tag && <Tag>{item.tag}</Tag>}
              <Title>{item.title}</Title>

              {item.description && <Description>{item.description}</Description>}

              {item.bullets?.length ? (
                <BulletList>
                  {item.bullets.map((bullet, bulletIndex) => (
                    <Bullet key={bulletIndex}>{bullet}</Bullet>
                  ))}
                </BulletList>
              ) : null}

              {item.cta && (
                <ActionRow>
                  <Button to={item.cta.to} variant={item.cta.variant || "ghost"}>
                    {item.cta.label}
                  </Button>
                </ActionRow>
              )}
            </ServiceCard>
          ))}
        </Grid>

        {cta && (
          <SectionAction>
            <Button to={cta.to}>{cta.label}</Button>
          </SectionAction>
        )}
      </Container>
    </Section>
  );
}
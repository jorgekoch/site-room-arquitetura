import styled from "styled-components";
import { Container } from "../components/ui/Container";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { SectionHeader } from "../components/sections/SectionHeader";
import { FaqSectionBase } from "../components/sections/FaqSectionBase";
import { siteConfig } from "../config/site";
import { contactPageData } from "../data/contact";
import { faqData } from "../data/faq";
import { media } from "../styles/breakpoints";

const Section = styled.section`
  padding: 2rem 0 5rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1rem;

  @media ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ContactCard = styled(Card)`
  display: grid;
  gap: 1rem;
`;

const Title = styled.h3`
  font-size: 1.15rem;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.75;
`;

const LinkList = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const SocialLink = styled.a`
  padding: 0.95rem 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.backgroundSoft};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSoft};
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

export function Contato() {
  return (
    <>
      <Section>
        <Container>
          <SectionHeader
            eyebrow={contactPageData.section.eyebrow}
            title={contactPageData.section.title}
            description={contactPageData.section.description}
          />

          <Grid>
            <ContactCard>
              <Title>{contactPageData.direct.title}</Title>
              <Text>{contactPageData.direct.text}</Text>

              <Button
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                Chamar no WhatsApp
              </Button>
            </ContactCard>

            <ContactCard>
              <Title>{contactPageData.social.title}</Title>
              <Text>{contactPageData.social.text}</Text>

              <LinkList>
                <SocialLink
                  href={siteConfig.contact.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </SocialLink>

                {siteConfig.contact.email && (
                  <SocialLink href={`mailto:${siteConfig.contact.email}`}>
                    {siteConfig.contact.email}
                  </SocialLink>
                )}
              </LinkList>
            </ContactCard>
          </Grid>
        </Container>
      </Section>

      <FaqSectionBase
        eyebrow="Dúvidas comuns"
        title="Perguntas que costumam surgir antes do contato"
        description="Esses pontos ajudam a tornar o processo mais claro e confortável para quem está avaliando o próximo passo."
        items={faqData.contact}
      />
    </>
  );
}
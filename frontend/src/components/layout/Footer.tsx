import styled from "styled-components";
import { Container } from "../ui/Container";
import { media } from "../../styles/breakpoints";
import logoRoomIcon from "../../assets/images/ui/logo-room-icon.png";

const NAV_ITEMS = [
  { label: "Início", href: "#topo" },
  { label: "Pra quem é", href: "#pra-quem-e" },
  { label: "Como projetamos", href: "#como-projetamos" },
  { label: "Projetos", href: "#portfolio" },
  { label: "Processo", href: "#processo" },
  { label: "Formatos", href: "#formatos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

const FooterWrapper = styled.footer`
  padding: 4rem 0 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background:
    radial-gradient(circle at top, rgba(184, 111, 82, 0.08), transparent 32%),
    ${({ theme }) => theme.colors.background};
`;

const Grid = styled.div`
  display: grid;
  gap: 2rem;

  @media ${media.tablet} {
    grid-template-columns: 1.2fr 0.8fr 0.8fr;
    align-items: start;
  }

  @media ${media.laptop} {
    gap: 3rem;
  }
`;

const BrandBlock = styled.div`
  display: grid;
  gap: 1rem;
`;

const BrandRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const BrandLogo = styled.img`
  width: 68px;
  height: 68px;
  object-fit: contain;
  display: block;
  flex-shrink: 0;

  @media ${media.tablet} {
    width: 76px;
    height: 76px;
  }
`;

const BrandMarkFallback = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.radius.md};
  display: grid;
  place-items: center;
  background: rgba(184, 111, 82, 0.12);
  border: 1px solid rgba(184, 111, 82, 0.24);
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 800;
  font-size: ${({ theme }) => theme.fontSizes.md};
  flex-shrink: 0;
`;

const BrandInfo = styled.div`
  display: grid;
  gap: 0.2rem;
`;

const BrandTitle = styled.strong`
  font-size: 1.1rem;
  line-height: 1.2;
`;

const BrandSubtitle = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const BrandText = styled.p`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.8;
  max-width: 460px;
`;

const Column = styled.div`
  display: grid;
  gap: 0.9rem;
`;

const ColumnTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const LinkList = styled.div`
  display: grid;
  gap: 0.7rem;
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.textSoft};
  text-decoration: none;
  line-height: 1.6;
  width: fit-content;
  transition:
    color ${({ theme }) => theme.transitions.default},
    transform ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    transform: translateX(2px);
  }
`;

const FooterText = styled.span`
  color: ${({ theme }) => theme.colors.textSoft};
  line-height: 1.6;
`;

const ContactGroup = styled.div`
  display: grid;
  gap: 0.7rem;
`;

const BottomBar = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.sm};

  @media ${media.tablet} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const CreditLink = styled.a`
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: opacity ${({ theme }) => theme.transitions.default};

  &:hover {
    opacity: 0.75;
  }
`;

export function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <Grid>
          <BrandBlock>
            <BrandRow>
              {logoRoomIcon ? (
                <BrandLogo
                  src={logoRoomIcon}
                  alt="Logo da ROOM Arquitetura Sustentável"
                />
              ) : (
                <BrandMarkFallback>R</BrandMarkFallback>
              )}

              <BrandInfo>
                <BrandTitle>ROOM Arquitetura Sustentável</BrandTitle>
                <BrandSubtitle>Arquitetura com propósito e sentimento</BrandSubtitle>
              </BrandInfo>
            </BrandRow>

            <BrandText>
              Projetos residenciais pensados a partir da escuta, do terreno e da
              identidade de quem vai viver cada espaço.
            </BrandText>
          </BrandBlock>

          <Column>
            <ColumnTitle>Navegação</ColumnTitle>

            <LinkList>
              {NAV_ITEMS.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </LinkList>
          </Column>

          <Column>
            <ColumnTitle>Contato</ColumnTitle>

            <ContactGroup>
              <FooterLink
                href="https://wa.me/5547997711663"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp: (47) 99771-1663
              </FooterLink>

              <FooterLink
                href="https://www.instagram.com/room.arquitetura/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </FooterLink>

              <FooterLink href="#contato">Solicitar proposta</FooterLink>

              <FooterText>Atendimento online em todo o Brasil</FooterText>
              <FooterText>Rio do Sul/SC</FooterText>
            </ContactGroup>
          </Column>
        </Grid>

        <BottomBar>
          <span>© 2026 ROOM Arquitetura Sustentável. Todos os direitos reservados.</span>
          <span>
            Site produzido por{" "}
            <CreditLink
              href="https://www.linkedin.com/in/jorge-koch/"
              target="_blank"
              rel="noreferrer"
            >
              Jorge Koch
            </CreditLink>
            .
          </span>
        </BottomBar>
      </Container>
    </FooterWrapper>
  );
}
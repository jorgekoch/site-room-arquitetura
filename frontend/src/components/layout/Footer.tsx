import { useSiteSettings } from "../../hooks/useSiteSettings";

import { Container } from "../ui/Container";
import { media } from "../../styles/breakpoints";
import logoRoomIcon from "../../assets/images/ui/logo-room-icon.png";

import styled from "styled-components";

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
    radial-gradient(
      circle at top,
      ${({ theme }) => theme.colors.secondarySoft},
      transparent 32%
    ),
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
  align-items: center;
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

  background: ${({ theme }) => theme.colors.secondarySoft};

  border: 1px solid ${({ theme }) => theme.colors.secondaryBorder};

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

function normalizeWhatsApp(value: string) {
  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  /*
   * Se o número já vier com código
   * do Brasil, mantém.
   *
   * Caso contrário, acrescenta 55.
   */
  if (digits.startsWith("55")) {
    return `https://wa.me/${digits}`;
  }

  return `https://wa.me/55${digits}`;
}

function normalizeInstagram(value: string) {
  const username = value
    .trim()
    .replace(/^@/, "")
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/\/+$/, "");

  if (!username) {
    return "";
  }

  return `https://www.instagram.com/${username}/`;
}

export function Footer() {
  const { settings } = useSiteSettings();

  const whatsapp = settings?.whatsapp?.trim() || "";

  const instagram = settings?.instagram?.trim() || "";

  const whatsappUrl = normalizeWhatsApp(whatsapp);

  const instagramUrl = normalizeInstagram(instagram);

  return (
    <FooterWrapper>
      <Container>
        <Grid>
          <BrandBlock>
            <BrandRow>
              {logoRoomIcon ? (
                <BrandLogo
                  src={logoRoomIcon}
                  alt="ROOM Arquitetura Sustentável"
                />
              ) : (
                <BrandMarkFallback>R</BrandMarkFallback>
              )}

              <BrandInfo>
                <BrandTitle>ROOM Arquitetura Sustentável</BrandTitle>
              </BrandInfo>
            </BrandRow>
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
              {whatsapp && (
                <FooterLink href={whatsappUrl} target="_blank" rel="noreferrer">
                  WhatsApp: {whatsapp}
                </FooterLink>
              )}

              {instagram && (
                <FooterLink
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </FooterLink>
              )}

              <FooterLink href="#contato">Solicitar proposta</FooterLink>

              <FooterText>Atendimento online em todo o Brasil</FooterText>

              <FooterText>Rio do Sul/SC e Florianópolis/SC</FooterText>
            </ContactGroup>
          </Column>
        </Grid>

        <BottomBar>
          <span>
            © 2026 ROOM Arquitetura Sustentável. Todos os direitos reservados.
          </span>

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

import { Link } from "react-router-dom";
import styled from "styled-components";
import { PortfolioSection } from "../../components/sections/PortfolioSection";
import { portfolioData } from "../../data/portfolio";
import { Reveal } from "../../components/motion/Reveal";
import { Container } from "../../components/ui/Container";
import { media } from "../../styles/breakpoints";

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 1.4rem;
  color: ${({ theme }) => theme.colors.textSoft};
  text-decoration: none;
  font-weight: 600;
  transition: color ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Page = styled.div`
  padding: 2rem 0 6rem;

  @media ${media.tablet} {
    padding: 2.5rem 0 6.5rem;
  }

  @media ${media.laptop} {
    padding: 3rem 0 7rem;
  }
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
  return (
    <Page>
      <Reveal>
        <Container>
          <BackLink to="/">← Voltar ao Início</BackLink>
          <NoticeBanner>Em obras — estamos carregando os projetos restantes.</NoticeBanner>
          <PortfolioSection
            eyebrow={portfolioData.section.eyebrow}
            title={portfolioData.section.title}
            description={portfolioData.section.description}
            items={portfolioData.items}
            showFilter={true}
            useSectionContainer={false}
          />
        </Container>
      </Reveal>
    </Page>
  );
}

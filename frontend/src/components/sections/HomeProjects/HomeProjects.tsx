import { Link } from "react-router-dom";

import {
  useFeaturedProjects,
} from "../../../hooks/useFeaturedProjects";

import * as S from "./styles";

export function HomeProjects() {
  const {
    projects,
    loading,
    error,
  } = useFeaturedProjects();

  if (loading) {
    return (
      <S.Section id="portfolio">
        <S.Container>
          <S.Header>
            <S.Eyebrow>
              Projetos
            </S.Eyebrow>

            <S.Title>
              Projetos selecionados
            </S.Title>

            <S.Description>
              Projetos pensados a partir
              da escuta, do lugar e da
              identidade de quem vive
              cada espaço.
            </S.Description>
          </S.Header>

          <S.ConstructionCard>
            <S.ConstructionIcon>
              ✦
            </S.ConstructionIcon>

            <S.ConstructionTitle>
              Carregando projetos...
            </S.ConstructionTitle>
          </S.ConstructionCard>
        </S.Container>
      </S.Section>
    );
  }

  if (
    error ||
    projects.length === 0
  ) {
    return (
      <S.Section id="portfolio">
        <S.Container>
          <S.Header>
            <S.Eyebrow>
              Projetos
            </S.Eyebrow>

            <S.Title>
              Projetos selecionados
            </S.Title>

            <S.Description>
              Projetos pensados a partir
              da escuta, do lugar e da
              identidade de quem vive
              cada espaço.
            </S.Description>
          </S.Header>

          <S.ConstructionCard>
            <S.ConstructionIcon>
              ✦
            </S.ConstructionIcon>

            <S.ConstructionTitle>
              Em construção
            </S.ConstructionTitle>

            <S.ConstructionText>
              Estamos preparando esta
              seleção de projetos.
              Em breve, novos trabalhos
              da ROOM Arquitetura
              Sustentável estarão aqui.
            </S.ConstructionText>
          </S.ConstructionCard>
        </S.Container>
      </S.Section>
    );
  }

  return (
    <S.Section id="portfolio">
      <S.Container>
        <S.Header>
          <S.Eyebrow>
            Projetos
          </S.Eyebrow>

          <S.Title>
            Projetos selecionados
          </S.Title>

          <S.Description>
            Projetos pensados a partir
            da escuta, do lugar e da
            identidade de quem vive
            cada espaço.
          </S.Description>
        </S.Header>

        <S.Grid>
          {projects.map(
            (project) => (
              <S.Card
                key={project.id}
                as={Link}
                to={`/projetos/${project.slug}`}
              >
                {project.featuredImage ? (
                  <S.Image
                    src={
                      project.featuredImage
                    }
                    alt={
                      project.title
                    }
                  />
                ) : (
                  <S.ImagePlaceholder>
                    Projeto
                  </S.ImagePlaceholder>
                )}

                <S.CardContent>
                  <S.CardTitle>
                    {project.title}
                  </S.CardTitle>

                  <S.CardLocation>
                    {project.city}

                    {project.city &&
                    project.state
                      ? " / "
                      : ""}

                    {project.state}
                  </S.CardLocation>
                </S.CardContent>
              </S.Card>
            )
          )}

          <S.ViewAllCard
            to="/projetos"
            aria-label="Ver todos os projetos"
          >
            <S.ViewAllIcon>
              →
            </S.ViewAllIcon>

            <S.ViewAllTitle>
              Ver todos os projetos
            </S.ViewAllTitle>

            <S.ViewAllText>
              Conheça todos os projetos
              da ROOM Arquitetura.
            </S.ViewAllText>
          </S.ViewAllCard>
        </S.Grid>
      </S.Container>
    </S.Section>
  );
}
import { Link } from "react-router-dom";

import { Project } from "../../../../types/project";

import * as S from "./styles";

interface RecentProjectsProps {
  projects: Project[];
}

export function RecentProjects({
  projects,
}: RecentProjectsProps) {
  return (
    <S.Container>

      <S.Header>

        <h2>Últimos Projetos</h2>

        <Link to="/admin/projetos">
          Ver todos
        </Link>

      </S.Header>

      {projects.length === 0 ? (
        <S.Empty>
          Nenhum projeto cadastrado.
        </S.Empty>
      ) : (
        <S.List>

          {projects.map((project) => (
            <S.Item key={project.id}>

              <div>

                <strong>
                  {project.title}
                </strong>

                <span>
                  {project.category}
                </span>

              </div>

              <S.Status
                $published={
                  project.published
                }
              >
                {project.published
                  ? "Publicado"
                  : "Rascunho"}
              </S.Status>

            </S.Item>
          ))}

        </S.List>
      )}

    </S.Container>
  );
}
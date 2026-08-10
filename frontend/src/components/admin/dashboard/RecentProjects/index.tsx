import { Link } from "react-router-dom";

import { Project } from "../../../../types/project";

import * as S from "./styles";
import { getProjectCategoryLabel } from "../../../../utils/projectCategory";

interface RecentProjectsProps {
  projects: Project[];
}

export function RecentProjects({
  projects,
}: RecentProjectsProps) {
  return (
    <S.Container>
      <S.Header>
        <div>
          <h2>Últimos Projetos</h2>

          <span>
            Projetos adicionados recentemente
          </span>
        </div>

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
            <S.Item
              key={project.id}
              to="/admin/projetos"
            >
              <S.ProjectInfo>
                {project.featuredImage ? (
                  <S.Thumbnail
                    src={project.featuredImage}
                    alt={project.title}
                  />
                ) : (
                  <S.Placeholder>
                    <span>ROOM</span>
                  </S.Placeholder>
                )}

                <div>
                  <strong>
                    {project.title}
                  </strong>

                  <span>
                    {getProjectCategoryLabel(project.category)}
                    {project.city
                      ? ` · ${project.city}`
                      : ""}
                  </span>
                </div>
              </S.ProjectInfo>

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
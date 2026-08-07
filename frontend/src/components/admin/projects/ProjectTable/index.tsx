import {
  Edit,
  Eye,
  EyeOff,
  Star,
  Trash2,
} from "lucide-react";

import { Project } from "../../../../types/project";

import * as S from "./styles";

interface Props {
  projects: Project[];

  onEdit(project: Project): void;

  onDelete(id: string): void;

  onPublish(id: string): void;

  onUnpublish(id: string): void;

  onFeature(id: string): void;

  onUnfeature(id: string): void;
}

export function ProjectTable({
  projects,
  onEdit,
  onDelete,
  onPublish,
  onUnpublish,
  onFeature,
  onUnfeature,
}: Props) {
  if (!projects.length) {
    return (
      <S.Empty>
        Nenhum projeto cadastrado.
      </S.Empty>
    );
  }

  return (
    <S.Table>

      <thead>

        <tr>

          <th>Projeto</th>

          <th>Categoria</th>

          <th>Local</th>

          <th>Status</th>

          <th>Destaque</th>

          <th>Ações</th>

        </tr>

      </thead>

      <tbody>

        {projects.map((project) => (

          <tr key={project.id}>

            <td>

              <S.Project>

                {project.featuredImage ? (

                  <img
                    src={project.featuredImage}
                    alt={project.title}
                  />

                ) : (

                  <S.Placeholder />

                )}

                <div>

                  <strong>

                    {project.title}

                  </strong>

                  <span>

                    {project.slug}

                  </span>

                </div>

              </S.Project>

            </td>

            <td>

              <S.Badge>

                {project.category}

              </S.Badge>

            </td>

            <td>

              {project.city || "-"}

              {project.year && (
                <>
                  <br />

                  <small>
                    {project.year}
                  </small>
                </>
              )}

            </td>

            <td>

              <S.Status
                published={project.published}
              >
                {project.published
                  ? "Publicado"
                  : "Rascunho"}
              </S.Status>

            </td>

            <td>

              {project.featured ? (
                <Star
                  size={18}
                  fill="currentColor"
                />
              ) : (
                "-"
              )}

            </td>

            <td>

              <S.Actions>

                <button
                  title="Editar"
                  onClick={() =>
                    onEdit(project)
                  }
                >
                  <Edit size={18} />
                </button>

                <button
                  title="Excluir"
                  onClick={() =>
                    onDelete(project.id)
                  }
                >
                  <Trash2 size={18} />
                </button>

                {project.published ? (

                  <button
                    title="Ocultar"
                    onClick={() =>
                      onUnpublish(project.id)
                    }
                  >
                    <EyeOff size={18} />
                  </button>

                ) : (

                  <button
                    title="Publicar"
                    onClick={() =>
                      onPublish(project.id)
                    }
                  >
                    <Eye size={18} />
                  </button>

                )}

                <button
                  title="Destacar"
                  onClick={() =>
                    project.featured
                      ? onUnfeature(project.id)
                      : onFeature(project.id)
                  }
                >
                  <Star
                    size={18}
                    fill={
                      project.featured
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>

              </S.Actions>

            </td>

          </tr>

        ))}

      </tbody>

    </S.Table>
  );
}
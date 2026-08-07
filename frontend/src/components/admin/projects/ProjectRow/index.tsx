import {
  Edit,
  Star,
  Trash2,
} from "lucide-react";

import { Project } from "../../../../types/project";

import { ProjectStatusBadge } from "../ProjectStatusBadge";

import * as S from "./styles";

interface Props {
  project: Project;
}

export function ProjectRow({
  project,
}: Props) {
  return (
    <S.Container>

      <S.Info>

        <strong>
          {project.title}
        </strong>

        <span>
          {project.category}
        </span>

        <small>
          {[project.city, project.state]
            .filter(Boolean)
            .join(" • ")}
        </small>

      </S.Info>

      <S.Actions>

        <ProjectStatusBadge
          published={project.published}
        />

        {project.featured && (
          <S.Featured>
            <Star
              size={15}
              fill="currentColor"
            />

            Destaque
          </S.Featured>
        )}

        <button>
          <Edit size={18} />
        </button>

        <button>
          <Trash2 size={18} />
        </button>

      </S.Actions>

    </S.Container>
  );
}
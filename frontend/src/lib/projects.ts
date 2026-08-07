import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
  apiPut,
} from "./api";

import {
  Project,
  ProjectImage,
} from "../types/project";

export interface CreateProjectDTO {
  title: string;

  slug: string;

  category: string;

  city?: string | null;

  state?: string | null;

  year?: number | null;

  area?: string | null;

  description: string;

  content?: string | null;

  featuredImage?: string | null;

  published: boolean;

  featured: boolean;

  images: ProjectImage[];
}

export type UpdateProjectDTO =
  Partial<CreateProjectDTO>;

export function getProjects() {
  return apiGet<Project[]>(
    "/projects"
  );
}

export function getProject(
  id: string
) {
  return apiGet<Project>(
    `/projects/${id}`
  );
}

export function createProject(
  data: CreateProjectDTO
) {
  return apiPost<Project>(
    "/projects",
    data
  );
}

export function updateProject(
  id: string,
  data: UpdateProjectDTO
) {
  return apiPut<Project>(
    `/projects/${id}`,
    data
  );
}

export function replaceProjectImages(
  id: string,
  images: ProjectImage[]
) {
  return apiPut<Project>(
    `/projects/${id}/images`,
    {
      images,
    }
  );
}

export function publishProject(
  id: string
) {
  return apiPatch<Project>(
    `/projects/${id}/publish`
  );
}

export function unpublishProject(
  id: string
) {
  return apiPatch<Project>(
    `/projects/${id}/unpublish`
  );
}

export function featureProject(
  id: string
) {
  return apiPatch<Project>(
    `/projects/${id}/feature`
  );
}

export function unfeatureProject(
  id: string
) {
  return apiPatch<Project>(
    `/projects/${id}/unfeature`
  );
}

export function deleteProject(
  id: string
) {
  return apiDelete(
    `/projects/${id}`
  );
}
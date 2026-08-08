import {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
} from "./api";

import {
  Project,
  ProjectImage,
} from "../types/project";

import {
  ProjectFormData,
  UpdateProjectFormData,
} from "../types/project-form";

export interface UploadProjectImageResponse {
  uploadUrl: string;
  storageKey: string;
  fileUrl: string;
}

/**
 * Lista todos os projetos administrativos.
 */
export function getProjects() {
  return apiGet<Project[]>(
    "/projects"
  );
}

/**
 * Busca um projeto pelo ID.
 */
export function getProject(id: string) {
  return apiGet<Project>(
    `/projects/${id}`
  );
}

/**
 * Cria um projeto.
 */
export function createProject(
  data: ProjectFormData
) {
  return apiPost(
    "/projects",
    data
  );
}

/**
 * Atualiza os dados principais
 * do projeto.
 *
 * A galeria é atualizada
 * separadamente.
 */
export function updateProject(
  id: string,
  data: UpdateProjectFormData
) {
  return apiPatch(
    `/projects/${id}`,
    data
  );
}

/**
 * Substitui toda a galeria
 * do projeto.
 */
export function replaceProjectImages(
  id: string,
  images: ProjectImage[]
) {
  return apiPatch(
    `/projects/${id}/images`,
    {
      images,
    }
  );
}

/**
 * Publica um projeto.
 */
export function publishProject(
  id: string
) {
  return apiPatch(
    `/projects/${id}/publish`
  );
}

/**
 * Remove a publicação.
 */
export function unpublishProject(
  id: string
) {
  return apiPatch(
    `/projects/${id}/unpublish`
  );
}

/**
 * Destaca um projeto.
 */
export function featureProject(
  id: string
) {
  return apiPatch(
    `/projects/${id}/feature`
  );
}

/**
 * Remove o destaque.
 */
export function unfeatureProject(
  id: string
) {
  return apiPatch(
    `/projects/${id}/unfeature`
  );
}

/**
 * Atualiza a imagem de capa.
 */
export function updateFeaturedImage(
  id: string,
  featuredImage: string
) {
  return apiPatch(
    `/projects/${id}/featured-image`,
    {
      featuredImage,
    }
  );
}

/**
 * Exclui um projeto.
 */
export function deleteProject(
  id: string
) {
  return apiDelete(
    `/projects/${id}`
  );
}

/**
 * Gera uma Signed URL para upload
 * direto ao Cloudflare R2.
 */
export function getProjectUploadUrl(
  fileName: string,
  fileType: string
) {
  return apiPost(
    "/projects/upload-url",
    {
      fileName,
      fileType,
    }
  ) as Promise<UploadProjectImageResponse>;
}

/**
 * Lista os projetos publicados para o site público.
 */
export function getPublishedProjects() {
  return apiGet<Project[]>(
    "/projects/published"
  );
}

/**
 * Busca um projeto publicado pelo slug.
 */
export function getPublicProjectBySlug(
  slug: string
) {
  return apiGet<Project>(
    `/projects/slug/${slug}`
  );
}

export function getFeaturedProjects() {
  return apiGet<Project[]>(
    "/projects/featured"
  );
}

/**
 * Busca um projeto publicado pelo slug.
 */
export function getPublishedProjectBySlug(slug: string) {
  return apiGet<Project>(
    `/projects/slug/${slug}`
  );
}
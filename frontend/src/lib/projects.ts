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

import {
  ProjectFormData,
  UpdateProjectFormData,
} from "../types/project-form";

export interface UploadProjectImageResponse {
  uploadUrl: string;
  storageKey: string;
  fileUrl: string;
  fileName: string;
}

/**
 * Lista todos os projetos
 */
export function getProjects() {
  return apiGet<Project[]>("/projects");
}

/**
 * Busca um projeto
 */
export function getProject(
  id: string
) {
  return apiGet<Project>(
    `/projects/${id}`
  );
}

/**
 * Cria um projeto
 */
export function createProject(
  data: ProjectFormData
) {
  return apiPost<Project>(
    "/projects",
    data
  );
}

/**
 * Atualiza um projeto
 */
export function updateProject(
  id: string,
  data: UpdateProjectFormData
) {
  return apiPut<Project>(
    `/projects/${id}`,
    data
  );
}

/**
 * Substitui toda a galeria
 */
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

/**
 * Publica um projeto
 */
export function publishProject(
  id: string
) {
  return apiPatch<Project>(
    `/projects/${id}/publish`
  );
}

/**
 * Remove publicação
 */
export function unpublishProject(
  id: string
) {
  return apiPatch<Project>(
    `/projects/${id}/unpublish`
  );
}

/**
 * Destaca projeto
 */
export function featureProject(
  id: string
) {
  return apiPatch<Project>(
    `/projects/${id}/feature`
  );
}

/**
 * Remove destaque
 */
export function unfeatureProject(
  id: string
) {
  return apiPatch<Project>(
    `/projects/${id}/unfeature`
  );
}

/**
 * Exclui projeto
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
  return apiPost<UploadProjectImageResponse>(
    "/projects/upload-url",
    {
      fileName,
      fileType,
    }
  );
}
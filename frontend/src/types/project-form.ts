import { ProjectImage } from "./project";

export interface ProjectFormData {
  title: string;

  slug: string;

  category: string;

  city?: string | null;

  state?: string | null;

  year?: number;

  area?: string | null;

  description: string;

  content?: string | null;

  featuredImage?: string | null;

  videoUrl?: string | null;

  published: boolean;

  featured: boolean;

  images: ProjectImage[];
}

export type UpdateProjectFormData =
  Partial<ProjectFormData>;
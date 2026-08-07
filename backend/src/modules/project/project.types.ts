import { ProjectCategory } from "@prisma/client";

export interface ProjectImageDTO {
  imageUrl: string;
  storageKey: string;
  alt?: string | null;
  sortOrder: number;
}

export interface CreateProjectDTO {
  title: string;
  slug: string;

  category: ProjectCategory;

  city?: string | null;
  state?: string | null;

  year?: number | null;

  area?: string | null;

  description: string;

  content?: string | null;

  featuredImage?: string | null;

  published: boolean;

  featured: boolean;

  images: ProjectImageDTO[];
}

export interface UpdateProjectDTO
  extends Partial<CreateProjectDTO> {}
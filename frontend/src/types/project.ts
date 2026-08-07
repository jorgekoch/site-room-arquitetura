export type ProjectCategory =
  | "RESIDENTIAL"
  | "INTERIORS"
  | "COMMERCIAL"
  | "LANDSCAPE"
  | "CONSULTING"
  | "OTHER";

export interface ProjectImage {
  id?: string;

  imageUrl: string;

  storageKey: string;

  alt?: string | null;

  sortOrder: number;
}

export interface Project {
  id: string;

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

  createdAt: string;

  updatedAt: string;

  images: ProjectImage[];
}

export interface ProjectDashboard {
  total: number;

  published: number;

  drafts: number;

  featured: number;

  latestProjects: Project[];
}
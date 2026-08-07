export interface ProjectImage {
  id: string;

  imageUrl: string;

  storageKey: string;

  alt?: string | null;

  sortOrder: number;
}

export interface Project {
  id: string;

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

  createdAt: string;

  updatedAt: string;

  images: ProjectImage[];
}
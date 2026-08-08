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

export type ProjectImageInput =
  | ProjectImage
  | string
  | {
      id?: string;
      imageUrl?: string | null;
      storageKey?: string | null;
      alt?: string | null;
      sortOrder?: number | null;
    };

/**
 * Normaliza as imagens recebidas pela API
 * para o formato utilizado pelo frontend.
 */
export function normalizeProjectImages(
  images?: ProjectImageInput[] | null
): ProjectImage[] {
  if (!Array.isArray(images)) {
    return [];
  }

  const normalized: ProjectImage[] = [];

  images.forEach((image, index) => {
    if (!image) {
      return;
    }

    if (typeof image === "string") {
      normalized.push({
        imageUrl: image,
        storageKey: "",
        alt: null,
        sortOrder: index,
      });

      return;
    }

    if (!image.imageUrl) {
      return;
    }

    normalized.push({
      id: image.id,
      imageUrl: image.imageUrl,
      storageKey: image.storageKey ?? "",
      alt: image.alt ?? null,
      sortOrder: image.sortOrder ?? index,
    });
  });

  return normalized;
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

  videoUrl?: string | null;

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
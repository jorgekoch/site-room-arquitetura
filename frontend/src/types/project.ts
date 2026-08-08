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
      url?: string | null;
      src?: string | null;
      storageKey?: string | null;
      alt?: string | null;
      sortOrder?: number | null;
    };

export function normalizeProjectImages(
  images?: ProjectImageInput[] | null
): ProjectImage[] {
  if (!Array.isArray(images)) {
    return [];
  }

  return images.flatMap((image, index) => {
    if (!image) {
      return [];
    }

    if (typeof image === "string") {
      return [
        {
          imageUrl: image,
          storageKey: "",
          alt: null,
          sortOrder: index,
        },
      ];
    }

    const imageUrl =
      image.imageUrl ??
      image.url ??
      image.src ??
      "";

    if (!imageUrl) {
      return [];
    }

    return [
      {
        id: image.id,
        imageUrl,
        storageKey: image.storageKey ?? "",
        alt: image.alt ?? null,
        sortOrder: image.sortOrder ?? index,
      },
    ];
  });
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
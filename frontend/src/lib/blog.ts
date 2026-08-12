import type { BlogPost } from "../types/blog";
import { apiGet, apiPatch, apiPost, apiDelete } from "./api";

export const DEFAULT_BLOG_POSTS: BlogPost[] = [];

export type BlogPostMutationPayload = Omit<BlogPost, "id" | "readingTime">;

type BlogImageUploadResponse = {
  uploadUrl: string;
  storageKey: string;
  fileUrl: string;
};

type UploadBlogImageOptions = {
  onProgress?: (progressPercent: number) => void;
};

const FALLBACK_BLOG_AUTHOR = "ROOM Arquitetura";
const FALLBACK_BLOG_CATEGORY = "Arquitetura";

export function normalizeBlogSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeBlogStatus(value?: string | null): BlogPost["status"] {
  const normalized = String(value ?? "draft")
    .trim()
    .toLowerCase();

  return normalized === "published" ? "published" : "draft";
}

function isValidDate(value: unknown): value is string | Date {
  if (value instanceof Date) {
    return !Number.isNaN(value.getTime());
  }

  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    return !Number.isNaN(date.getTime());
  }

  return false;
}

function normalizeOptionalUrl(value: unknown) {
  if (!value) {
    return undefined;
  }

  const candidate = String(value).trim();
  if (!candidate) {
    return undefined;
  }

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return undefined;
    }
  } catch {
    return undefined;
  }

  return candidate;
}

function normalizeBlogPost(
  post: Partial<BlogPost> & { status?: string; publishedAt?: string | Date },
): BlogPost | null {
  if (!post || !post.id || !post.title || !post.slug) {
    return null;
  }

  const author =
    String(post.author ?? FALLBACK_BLOG_AUTHOR).trim() || FALLBACK_BLOG_AUTHOR;
  const category =
    String(post.category ?? FALLBACK_BLOG_CATEGORY).trim() ||
    FALLBACK_BLOG_CATEGORY;
  const slug = normalizeBlogSlug(String(post.slug));

  if (!slug || slug.length < 3) {
    return null;
  }

  const fallbackPublishedAt = new Date().toISOString();
  const publishedAt = isValidDate(post.publishedAt)
    ? new Date(post.publishedAt).toISOString()
    : fallbackPublishedAt;

  return {
    id: String(post.id),
    title: String(post.title).trim(),
    slug,
    excerpt: String(post.excerpt ?? "").trim(),
    content: String(post.content ?? "").trim(),
    coverImage: normalizeOptionalUrl(post.coverImage),
    author,
    category,
    publishedAt,
    readingTime: Number.isFinite(Number(post.readingTime))
      ? Math.max(1, Number(post.readingTime))
      : 4,
    status: normalizeBlogStatus(post.status),
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = (await apiGet<
      {
        id: string;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        coverImage?: string | null;
        author: string;
        category: string;
        publishedAt: string;
        readingTime: number;
        status?: string;
      }[]
    >("/blog")) as Array<Partial<BlogPost>>;
    const posts = response
      .map((post) => normalizeBlogPost(post))
      .filter((post): post is BlogPost => Boolean(post));

    return [...posts].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  } catch {
    return DEFAULT_BLOG_POSTS;
  }
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = (await apiGet<
      {
        id: string;
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        coverImage?: string | null;
        author: string;
        category: string;
        publishedAt: string;
        readingTime: number;
        status?: string;
      }[]
    >("/blog/published")) as Array<Partial<BlogPost>>;
    const posts = response
      .map((post) => normalizeBlogPost(post))
      .filter((post): post is BlogPost => Boolean(post));

    return [...posts].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  } catch {
    return DEFAULT_BLOG_POSTS;
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const response = await apiGet<
      Partial<BlogPost> & { status?: string; publishedAt?: string }
    >(`/blog/slug/${encodeURIComponent(slug)}`);
    return normalizeBlogPost(response);
  } catch {
    return undefined;
  }
}

export async function createBlogPost(payload: BlogPostMutationPayload) {
  const normalizedStatus = normalizeBlogStatus(payload.status);

  const result = await apiPost<{ post: BlogPost }>("/blog", {
    ...payload,
    status: normalizedStatus === "published" ? "PUBLISHED" : "DRAFT",
  });

  return {
    ...result.post,
    status: normalizeBlogStatus(result.post.status),
  };
}

export async function updateBlogPost(
  id: string,
  payload: Partial<BlogPostMutationPayload>,
) {
  const normalizedStatus = normalizeBlogStatus(payload.status);

  const result = await apiPatch<{ post: BlogPost }>(`/blog/${id}`, {
    ...payload,
    status: normalizedStatus === "published" ? "PUBLISHED" : "DRAFT",
  });

  return {
    ...result.post,
    status: normalizeBlogStatus(result.post.status),
  };
}

export async function deleteBlogPost(id: string) {
  await apiDelete(`/blog/${id}`);
}

function uploadFileToSignedUrl(
  file: File,
  uploadUrl: string,
  fileType: string,
  onProgress?: (progressPercent: number) => void,
) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (!onProgress || !event.lengthComputable) {
        return;
      }

      const progressPercent = Math.round((event.loaded / event.total) * 100);
      onProgress(progressPercent);
    };

    xhr.onerror = () => {
      reject(new Error("Não foi possível enviar a imagem de capa."));
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
        return;
      }

      reject(new Error("Não foi possível enviar a imagem de capa."));
    };

    xhr.open("PUT", uploadUrl);
    xhr.setRequestHeader("Content-Type", fileType);
    xhr.send(file);
  });
}

export async function uploadBlogImage(
  file: File,
  options?: UploadBlogImageOptions,
) {
  const fallbackName = `blog-cover-${Date.now()}.png`;
  const fileName = file.name?.trim() ? file.name : fallbackName;
  const fileType = file.type || "image/png";

  const upload = await apiPost<BlogImageUploadResponse>("/blog/upload-url", {
    fileName,
    fileType,
  });

  await uploadFileToSignedUrl(
    file,
    upload.uploadUrl,
    fileType,
    options?.onProgress,
  );

  return upload.fileUrl;
}

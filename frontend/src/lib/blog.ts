import type { BlogPost } from "../types/blog";
import { apiGet, apiPatch, apiPost, apiDelete } from "./api";

export const DEFAULT_BLOG_POSTS: BlogPost[] = [];

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

function normalizeBlogPost(
  post: Partial<BlogPost> & { status?: string; publishedAt?: string | Date },
): BlogPost | null {
  if (!post || !post.id || !post.title || !post.slug) {
    return null;
  }

  return {
    id: String(post.id),
    title: String(post.title),
    slug: String(post.slug),
    excerpt: String(post.excerpt ?? ""),
    content: String(post.content ?? ""),
    coverImage: post.coverImage ? String(post.coverImage) : undefined,
    author: String(post.author ?? "ROOM Arquitetura"),
    category: String(post.category ?? "Arquitetura"),
    publishedAt: new Date(post.publishedAt ?? Date.now()).toISOString(),
    readingTime: Number(post.readingTime ?? 4),
    status:
      String(post.status ?? "draft").toLowerCase() === "published"
        ? "published"
        : "draft",
    youtubeUrl: post.youtubeUrl ? String(post.youtubeUrl) : undefined,
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
        youtubeUrl?: string | null;
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
        youtubeUrl?: string | null;
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

export async function createBlogPost(payload: Omit<BlogPost, "id">) {
  const result = await apiPost<{ post: BlogPost }>("/blog", {
    ...payload,
    status: payload.status === "published" ? "PUBLISHED" : "DRAFT",
  });

  return result.post;
}

export async function updateBlogPost(id: string, payload: Partial<BlogPost>) {
  const result = await apiPatch<{ post: BlogPost }>(`/blog/${id}`, {
    ...payload,
    status: payload.status === "published" ? "PUBLISHED" : "DRAFT",
  });

  return result.post;
}

export async function deleteBlogPost(id: string) {
  await apiDelete(`/blog/${id}`);
}

export function getYoutubeEmbedUrl(value?: string) {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  const match = trimmed.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/i,
  );

  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }

  return trimmed;
}

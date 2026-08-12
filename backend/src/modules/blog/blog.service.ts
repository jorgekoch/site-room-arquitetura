import { AppError } from "../../utils/AppError";
import { env } from "../../config/env";
import { storage } from "../../services/storage";
import { BlogRepository } from "./blog.repository";
import {
  getBlogReadingTime,
  sanitizeBlogContent,
  validateBlogContent,
} from "./blog-content";
import { CreateBlogPostInput, UpdateBlogPostInput } from "./blog.schema";

const BLOG_ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const BLOG_MAX_IMAGE_SIZE = 10 * 1024 * 1024;

function normalizeBlogSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getBlogStorageKeyFromUrl(value: string | null | undefined) {
  if (!value?.trim()) {
    return null;
  }

  const baseUrl = env.r2PublicUrl.replace(/\/$/, "");

  if (!value.startsWith(`${baseUrl}/`)) {
    return null;
  }

  const key = value.slice(baseUrl.length + 1);

  return key.startsWith("blog/") ? key : null;
}

function extractBlogStorageKeys(content: string, coverImage?: string | null) {
  const keys = new Set<string>();

  const coverKey = getBlogStorageKeyFromUrl(coverImage);
  if (coverKey) {
    keys.add(coverKey);
  }

  const srcPattern = /\bsrc=["']([^"']+)["']/gi;

  for (const match of content.matchAll(srcPattern)) {
    const key = getBlogStorageKeyFromUrl(match[1]);
    if (key) {
      keys.add(key);
    }
  }

  return [...keys];
}

export class BlogService {
  private readonly repository = new BlogRepository();

  async generateUploadUrl(fileName: string, fileType: string) {
    if (!fileName?.trim()) {
      throw new AppError("Nome do arquivo não informado.", 400);
    }

    if (!BLOG_ALLOWED_IMAGE_TYPES.includes(fileType)) {
      throw new AppError("Formato de imagem não permitido.", 400);
    }

    return storage.generateSignedUrl({
      folder: "blog",
      fileName: fileName.trim(),
      fileType,
    });
  }

  private async validateBlogImages(content: string, coverImage?: string | null) {
    const storageKeys = extractBlogStorageKeys(content, coverImage);

    await Promise.all(
      storageKeys.map((storageKey) =>
        storage.validateObject(storageKey, {
          maxSize: BLOG_MAX_IMAGE_SIZE,
          allowedContentTypes: BLOG_ALLOWED_IMAGE_TYPES,
        }),
      ),
    );
  }

  private async deleteBlogStorageKeys(storageKeys: string[]) {
    const uniqueKeys = [
      ...new Set(
        storageKeys.filter((key) => key.startsWith("blog/") && key.trim()),
      ),
    ];

    if (!uniqueKeys.length) {
      return;
    }

    try {
      await storage.deleteMany(uniqueKeys);
    } catch (error) {
      console.error("[BlogService] Falha ao remover arquivos do R2:", {
        keys: uniqueKeys,
        error,
      });
    }
  }

  async list() {
    return this.repository.findAll();
  }

  async listPublished() {
    return this.repository.findPublished();
  }

  async create(data: CreateBlogPostInput) {
    const slug = normalizeBlogSlug(data.slug);
    const contentError = validateBlogContent(data.content);
    const sanitizedContent = sanitizeBlogContent(data.content);
    const readingTime = getBlogReadingTime(sanitizedContent);

    if (slug.length < 3) {
      throw new AppError(
        "O slug precisa resultar em pelo menos 3 caracteres válidos.",
        400,
      );
    }

    if (contentError) {
      throw new AppError(contentError, 400);
    }

    await this.validateBlogImages(sanitizedContent, data.coverImage);

    const existing = await this.repository.findAnyBySlug(slug);
    if (existing) {
      throw new AppError("Já existe uma publicação com este slug.", 409);
    }

    try {
      return await this.repository.create({
        ...data,
        content: sanitizedContent,
        readingTime,
        slug,
        publishedAt: new Date(data.publishedAt),
      });
    } catch (error) {
      await this.deleteBlogStorageKeys(
        extractBlogStorageKeys(sanitizedContent, data.coverImage),
      );

      throw error;
    }
  }

  async findById(id: string) {
    const post = await this.repository.findById(id);

    if (!post) {
      throw new AppError("Publicação não encontrada.", 404);
    }

    return post;
  }

  async findBySlug(slug: string) {
    const normalizedSlug = normalizeBlogSlug(slug);

    if (normalizedSlug.length < 3) {
      throw new AppError("Slug inválido.", 400);
    }

    const post = await this.repository.findBySlug(normalizedSlug);

    if (!post) {
      throw new AppError("Publicação não encontrada.", 404);
    }

    return post;
  }

  async update(id: string, data: UpdateBlogPostInput) {
    const currentPost = await this.findById(id);

    const nextData: UpdateBlogPostInput & { readingTime?: number } = {
      ...data,
    };

    if (nextData.content !== undefined) {
      const contentError = validateBlogContent(nextData.content);

      if (contentError) {
        throw new AppError(contentError, 400);
      }

      nextData.content = sanitizeBlogContent(nextData.content);
      nextData.readingTime = getBlogReadingTime(nextData.content);
    }

    if (nextData.slug !== undefined) {
      const normalizedSlug = normalizeBlogSlug(nextData.slug);

      if (normalizedSlug.length < 3) {
        throw new AppError(
          "O slug precisa resultar em pelo menos 3 caracteres válidos.",
          400,
        );
      }

      const existing = await this.repository.findAnyBySlug(normalizedSlug);

      if (existing && existing.id !== id) {
        throw new AppError("Este slug já está sendo utilizado.", 409);
      }

      nextData.slug = normalizedSlug;
    }

    const nextContent = nextData.content ?? currentPost.content;
    const nextCoverImage =
      nextData.coverImage !== undefined
        ? nextData.coverImage
        : currentPost.coverImage;

    await this.validateBlogImages(nextContent, nextCoverImage);

    let updatedPost;

    try {
      updatedPost = await this.repository.update(id, nextData);
    } catch (error) {
      const currentKeys = extractBlogStorageKeys(
        currentPost.content,
        currentPost.coverImage,
      );
      const nextKeys = extractBlogStorageKeys(nextContent, nextCoverImage);
      const newKeys = nextKeys.filter((key) => !currentKeys.includes(key));

      await this.deleteBlogStorageKeys(newKeys);
      throw error;
    }

    const currentKeys = extractBlogStorageKeys(
      currentPost.content,
      currentPost.coverImage,
    );
    const nextKeys = extractBlogStorageKeys(nextContent, nextCoverImage);
    const removedKeys = currentKeys.filter((key) => !nextKeys.includes(key));

    await this.deleteBlogStorageKeys(removedKeys);

    return updatedPost;
  }

  async remove(id: string) {
    const post = await this.findById(id);
    const storageKeys = extractBlogStorageKeys(post.content, post.coverImage);

    await this.repository.delete(id);
    await this.deleteBlogStorageKeys(storageKeys);
  }

  async cleanupOrphanedStorage() {
    const [objects, posts] = await Promise.all([
      storage.listObjects("blog/"),
      this.repository.findAll(),
    ]);

    const usedStorageKeys = new Set<string>();

    for (const post of posts) {
      for (const key of extractBlogStorageKeys(post.content, post.coverImage)) {
        usedStorageKeys.add(key);
      }
    }

    const orphanedKeys = objects
      .map((object) => object.key)
      .filter((key) => !usedStorageKeys.has(key));

    await this.deleteBlogStorageKeys(orphanedKeys);

    return {
      scanned: objects.length,
      deleted: orphanedKeys.length,
      keys: orphanedKeys,
    };
  }
}

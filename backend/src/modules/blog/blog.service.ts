import { AppError } from "../../utils/AppError";
import { storage } from "../../services/storage";
import { BlogRepository } from "./blog.repository";
import {
  getBlogReadingTime,
  sanitizeBlogContent,
  validateBlogContent,
} from "./blog-content";
import { CreateBlogPostInput, UpdateBlogPostInput } from "./blog.schema";

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

export class BlogService {
  private readonly repository = new BlogRepository();

  async generateUploadUrl(fileName: string, fileType: string) {
    if (!fileName?.trim()) {
      throw new AppError("Nome do arquivo não informado.", 400);
    }

    if (!fileType?.trim()) {
      throw new AppError("Formato do arquivo não informado.", 400);
    }

    return storage.generateSignedUrl({
      folder: "blog",
      fileName: fileName.trim(),
      fileType,
    });
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

    const existing = await this.repository.findAnyBySlug(slug);
    if (existing) {
      throw new AppError("Já existe uma publicação com este slug.", 409);
    }

    return this.repository.create({
      ...data,
      content: sanitizedContent,
      readingTime,
      slug,
      publishedAt: new Date(data.publishedAt),
    });
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
    await this.findById(id);

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

    return this.repository.update(id, nextData);
  }

  async remove(id: string) {
    await this.findById(id);
    await this.repository.delete(id);
  }
}

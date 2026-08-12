import type { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { createBlogPostSchema, updateBlogPostSchema } from "./blog.schema";
import { BlogService } from "./blog.service";

const service = new BlogService();
const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

export class BlogController {
  async getUploadUrl(request: Request, response: Response) {
    const { fileName, fileType } = request.body;

    if (typeof fileName !== "string" || !fileName.trim()) {
      throw new AppError("Nome do arquivo não informado.", 400);
    }

    if (typeof fileType !== "string" || !allowedMimeTypes.includes(fileType)) {
      throw new AppError("Formato de imagem não permitido.", 400);
    }

    const upload = await service.generateUploadUrl(fileName, fileType);

    return response.json(upload);
  }

  async create(request: Request, response: Response) {
    const data = createBlogPostSchema.parse(request.body);
    const post = await service.create(data);

    return response.status(201).json({
      message: "Publicação criada com sucesso.",
      post,
    });
  }

  async list(_request: Request, response: Response) {
    const posts = await service.list();
    return response.json(posts);
  }

  async listPublished(_request: Request, response: Response) {
    const posts = await service.listPublished();
    return response.json(posts);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID inválido.", 400);
    }

    const post = await service.findById(id);
    return response.json(post);
  }

  async showBySlug(request: Request, response: Response) {
    const { slug } = request.params;

    if (!slug || Array.isArray(slug)) {
      throw new AppError("Slug inválido.", 400);
    }

    const post = await service.findBySlug(slug);
    return response.json(post);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID inválido.", 400);
    }

    const data = updateBlogPostSchema.parse(request.body);
    const post = await service.update(id, data);

    return response.json({
      message: "Publicação atualizada com sucesso.",
      post,
    });
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID inválido.", 400);
    }

    await service.remove(id);
    return response.status(204).send();
  }

  async cleanupOrphanedStorage(_request: Request, response: Response) {
    const result = await service.cleanupOrphanedStorage();

    return response.json({
      message: "Limpeza do armazenamento do Blog concluída.",
      ...result,
    });
  }
}

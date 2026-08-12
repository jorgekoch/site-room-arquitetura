import type { Request, Response } from "express";

import { AppError } from "../../utils/AppError";

import {
  createProjectSchema,
  projectImageSchema,
  updateFeaturedImageSchema,
  updateProjectSchema,
  uploadProjectImageSchema,
} from "./project.schema";

import { ProjectService } from "./project.service";

const service = new ProjectService();

export class ProjectController {
  async getUploadUrl(request: Request, response: Response) {
    const { fileName, fileType } = uploadProjectImageSchema.parse(request.body);

    const upload = await service.generateUploadUrl(fileName, fileType);

    return response.json(upload);
  }

  async create(request: Request, response: Response) {
    const data = createProjectSchema.parse(request.body);

    const project = await service.create(data);

    return response.status(201).json({
      message: "Projeto criado com sucesso.",
      project,
    });
  }

  async list(_request: Request, response: Response) {
    const projects = await service.list();

    return response.json(projects);
  }

  async listPublished(_request: Request, response: Response) {
    const projects = await service.listPublished();

    return response.json(projects);
  }

  async listFeatured(_request: Request, response: Response) {
    const projects = await service.findFeatured();

    return response.json(projects);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID inválido.", 400);
    }

    const project = await service.findById(id);

    return response.json(project);
  }

  async showBySlug(request: Request, response: Response) {
    const { slug } = request.params;

    if (!slug || Array.isArray(slug)) {
      throw new AppError("Slug inválido.", 400);
    }

    const project = await service.findBySlug(slug);

    return response.json(project);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID inválido.", 400);
    }

    const data = updateProjectSchema.parse(request.body);
    const project = await service.update(id, data);

    return response.json({
      message: "Projeto atualizado com sucesso.",
      project,
    });
  }

  async replaceImages(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID inválido.", 400);
    }

    const parsedImages = projectImageSchema
      .array()
      .parse(request.body.images);

    const project = await service.replaceImages(id, parsedImages);

    return response.json({
      message: "Galeria atualizada com sucesso.",
      project,
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

  async publish(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID inválido.", 400);
    }

    return response.json(await service.publish(id));
  }

  async unpublish(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID inválido.", 400);
    }

    return response.json(await service.unpublish(id));
  }

  async feature(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID inválido.", 400);
    }

    return response.json(await service.feature(id));
  }

  async unfeature(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID inválido.", 400);
    }

    return response.json(await service.unfeature(id));
  }

  async updateFeaturedImage(request: Request, response: Response) {
    const { id } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID inválido.", 400);
    }

    const data = updateFeaturedImageSchema.parse(request.body);

    const project = await service.updateFeaturedImage(
      id,
      data.featuredImage,
      data.featuredImageStorageKey,
    );

    return response.json(project);
  }

  async deleteImage(request: Request, response: Response) {
    const { id, imageId } = request.params;

    if (!id || Array.isArray(id)) {
      throw new AppError("ID do projeto inválido.", 400);
    }

    if (!imageId || Array.isArray(imageId)) {
      throw new AppError("Imagem inválida.", 400);
    }

    await service.deleteImage(id, imageId);

    return response.status(204).send();
  }

  async findOrphanedStorageObjects(_request: Request, response: Response) {
    return response.json(await service.findOrphanedStorageObjects());
  }

  async cleanupOrphanedStorageObjects(_request: Request, response: Response) {
    return response.json(await service.cleanupOrphanedStorageObjects());
  }
}

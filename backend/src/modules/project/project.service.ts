import { AppError } from "../../utils/AppError";

import {
  CreateProjectInput,
  UpdateProjectInput,
} from "./project.schema";

import { ProjectRepository } from "./project.repository";
import { storage } from "../../services/storage";

export class ProjectService {
  private readonly repository = new ProjectRepository();

  async create(data: CreateProjectInput) {
    const slugAlreadyExists =
      await this.repository.existsBySlug(data.slug);

    if (slugAlreadyExists) {
      throw new AppError(
        "Já existe um projeto utilizando este slug.",
        409
      );
    }

    return this.repository.create(data);
  }

  async list() {
    return this.repository.findAll();
  }

  async listPublished() {
    return this.repository.findPublished();
  }

  async findFeatured() {
    return this.repository.findFeatured(5);
  }

  async findById(id: string) {
    const project =
      await this.repository.findById(id);

    if (!project) {
      throw new AppError(
        "Projeto não encontrado.",
        404
      );
    }

    return project;
  }

  async findBySlug(slug: string) {
    const project =
      await this.repository.findBySlug(slug);

    if (!project) {
      throw new AppError(
        "Projeto não encontrado.",
        404
      );
    }

    return project;
  }

  async update(
    id: string,
    data: UpdateProjectInput
  ) {
    await this.findById(id);

    if (data.slug) {
      const existing =
        await this.repository.findAnyBySlug(
          data.slug
        );

      if (
        existing &&
        existing.id !== id
      ) {
        throw new AppError(
          "Este slug já está sendo utilizado.",
          409
        );
      }
    }

    return this.repository.update(
      id,
      data
    );
  }

  async replaceImages(
    id: string,
    images: CreateProjectInput["images"]
  ) {
    const project = await this.findById(id);

    const storageKeys =
      project.images.map(
        (image) => image.storageKey
      );

    if (storageKeys.length) {
      await storage.deleteMany(storageKeys);
    }

    return this.repository.replaceImages(
      id,
      images
    );
  }

  async remove(id: string) {
    const project =
      await this.findById(id);

    const storageKeys =
      project.images.map(
        (image) => image.storageKey
      );

    if (storageKeys.length) {
      await storage.deleteMany(storageKeys);
    }

    await this.repository.delete(id);
  }

  async publish(id: string) {
    await this.findById(id);

    return this.repository.publish(id);
  }

  async unpublish(id: string) {
    await this.findById(id);

    return this.repository.unpublish(id);
  }

  async feature(id: string) {
    const project =
      await this.findById(id);

    if (!project.published) {
      throw new AppError(
        "Somente projetos publicados podem ser destacados.",
        400
      );
    }

    if (project.featured) {
      return project;
    }

    const featuredCount =
      await this.repository.countFeatured();

    if (featuredCount >= 5) {
      throw new AppError(
        "Já existem 5 projetos em destaque. Remova um destaque antes de adicionar outro.",
        400
      );
    }

    return this.repository.feature(id);
  }

  async unfeature(id: string) {
    await this.findById(id);

    return this.repository.unfeature(id);
  }

  async updateFeaturedImage(
    id: string,
    featuredImage: string
  ) {
    await this.findById(id);

    return this.repository.updateFeaturedImage(
      id,
      featuredImage
    );
  }

  async deleteImage(imageId: string) {
    const image =
      await this.repository.findImageById(
        imageId
      );

    if (!image) {
      throw new AppError(
        "Imagem não encontrada.",
        404
      );
    }

    await storage.delete(image.storageKey);

    return this.repository.deleteImage(
      imageId
    );
  }
  
  async generateUploadUrl(
    fileName: string,
    fileType: string
  ) {
    return storage.generateSignedUrl({
      folder: "projects",
      fileName,
      fileType,
    });
  }
}
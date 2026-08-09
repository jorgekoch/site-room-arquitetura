import { AppError } from "../../utils/AppError";

import {
  CreateProjectInput,
  UpdateProjectInput,
} from "./project.schema";

import { ProjectRepository } from "./project.repository";
import { storage } from "../../services/storage";
import { prisma } from "../../database/prisma";

const PROJECT_ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

const PROJECT_MAX_IMAGE_SIZE =
  10 * 1024 * 1024;

const PROJECT_MAX_GALLERY_IMAGES = 20;

function normalizeProjectSlug(
  slug: string
) {
  return slug
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export class ProjectService {
  private readonly repository = new ProjectRepository();

  async create(data: CreateProjectInput) {
    const normalizedSlug =
      normalizeProjectSlug(data.slug);

    const slugAlreadyExists =
      await this.repository.existsBySlug(
        normalizedSlug
      );

    if (slugAlreadyExists) {
      throw new AppError(
        "Já existe um projeto utilizando este slug.",
        409
      );
    }

    if (data.featuredImageStorageKey) {
      await storage.validateObject(
        data.featuredImageStorageKey,
        {
          maxSize: PROJECT_MAX_IMAGE_SIZE,
          allowedContentTypes:
            PROJECT_ALLOWED_IMAGE_TYPES,
        }
      );
    }

    if (
      data.images.length >
      PROJECT_MAX_GALLERY_IMAGES
    ) {
      throw new AppError(
        `Um projeto pode ter no máximo ${PROJECT_MAX_GALLERY_IMAGES} imagens na galeria.`,
        400
      );
    }

    for (const image of data.images) {
      await storage.validateObject(
        image.storageKey,
        {
          maxSize: PROJECT_MAX_IMAGE_SIZE,
          allowedContentTypes:
            PROJECT_ALLOWED_IMAGE_TYPES,
        }
      );
    }

    const normalizedData = {
      ...data,
      slug: normalizedSlug,
    };

    return this.repository.create(
      normalizedData
    );
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
    const currentProject =
      await this.findById(id);

    let normalizedData =
      data;

    if (data.slug) {
      const normalizedSlug =
        normalizeProjectSlug(
          data.slug
        );

      const existing =
        await this.repository.findAnyBySlug(
          normalizedSlug
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

      normalizedData = {
        ...data,
        slug: normalizedSlug,
      };
    }

    if (
      data.featuredImageStorageKey
    ) {
      await storage.validateObject(
        data.featuredImageStorageKey,
        {
          maxSize:
            PROJECT_MAX_IMAGE_SIZE,
          allowedContentTypes:
            PROJECT_ALLOWED_IMAGE_TYPES,
        }
      );
    }

    const oldFeaturedImageStorageKey =
      currentProject.featuredImageStorageKey;

    const newFeaturedImageStorageKey =
      normalizedData.featuredImageStorageKey;

    const featuredImageChanged =
      newFeaturedImageStorageKey !==
      undefined &&
      newFeaturedImageStorageKey !==
      oldFeaturedImageStorageKey;

    const updatedProject =
      await this.repository.update(
        id,
        normalizedData
      );

    if (
      featuredImageChanged &&
      oldFeaturedImageStorageKey
    ) {
      try {
        await storage.delete(
          oldFeaturedImageStorageKey
        );
      } catch (error) {
        console.error(
          "Erro ao remover a capa antiga do R2:",
          error
        );
      }
    }

    return updatedProject;
  }

  async replaceImages(
    id: string,
    images: CreateProjectInput["images"]
  ) {
    const project =
      await this.findById(id);

    const allowedContentTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];

    const maxImageSize =
      10 * 1024 * 1024;

    if (
      images.length >
      PROJECT_MAX_GALLERY_IMAGES
    ) {
      throw new AppError(
        `Um projeto pode ter no máximo ${PROJECT_MAX_GALLERY_IMAGES} imagens na galeria.`,
        400
      );
    }

    for (const image of images) {
      await storage.validateObject(
        image.storageKey,
        {
          maxSize: maxImageSize,
          allowedContentTypes,
        }
      );
    }

    const oldStorageKeys =
      project.images
        .map((image) => image.storageKey)
        .filter(Boolean);

    const updatedProject =
      await this.repository.replaceImages(
        id,
        images
      );

    if (oldStorageKeys.length) {
      try {
        await storage.deleteMany(
          oldStorageKeys
        );
      } catch (error) {
        console.error(
          "Erro ao remover imagens antigas da galeria no R2:",
          error
        );
      }
    }

    return updatedProject;
  }

  async remove(id: string) {
    const project =
      await this.findById(id);

    const storageKeys = [
      ...project.images.map(
        (image) => image.storageKey
      ),
      ...(project.featuredImageStorageKey
        ? [project.featuredImageStorageKey]
        : []),
    ].filter(Boolean);

    if (storageKeys.length) {
      try {
        await storage.deleteMany(
          storageKeys
        );
      } catch (error) {
        console.error(
          "Erro ao remover arquivos do projeto no R2:",
          error
        );
      }
    }

    await this.repository.delete(id);
  }

  async publish(id: string) {
    await this.findById(id);

    return this.repository.publish(id);
  }

  async unpublish(id: string) {
    return prisma.project.update({
      where: {
        id,
      },
      data: {
        published: false,
        featured: false,
      },
    });
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

    const deletedImage =
      await this.repository.deleteImage(
        imageId
      );

    try {
      await storage.delete(
        image.storageKey
      );
    } catch (error) {
      console.error(
        "Erro ao remover imagem do R2 após exclusão no banco:",
        error
      );
    }

    return deletedImage;
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
import { AppError } from "../../utils/AppError";

import { CreateProjectInput, UpdateProjectInput } from "./project.schema";

import { ProjectRepository } from "./project.repository";
import { storage } from "../../services/storage";
import { SettingsService } from "../settings/settings.service";

const PROJECT_ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

function normalizeProjectSlug(slug: string) {
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

  private readonly settingsService = new SettingsService();

  private validateProjectStorageKey(storageKey: string) {
    if (!storageKey.startsWith("projects/")) {
      throw new AppError("Arquivo inválido para este projeto.", 400);
    }
  }

  private async validateProjectImage(storageKey: string) {
    this.validateProjectStorageKey(storageKey);

    const settings = await this.settingsService.get();

    const maxSize = settings.maxProjectImageSizeMb * 1024 * 1024;

    await storage.validateObject(storageKey, {
      maxSize,
      allowedContentTypes: PROJECT_ALLOWED_IMAGE_TYPES,
    });
  }

  private async deleteStorageKeys(storageKeys: string[], context: string) {
    const uniqueStorageKeys = [
      ...new Set(storageKeys.filter((key) => Boolean(key?.trim()))),
    ];

    if (!uniqueStorageKeys.length) {
      return;
    }

    const keysToDelete: string[] = [];
    const protectedKeys: string[] = [];

    for (const storageKey of uniqueStorageKeys) {
      const isInUse = await this.repository.isStorageKeyInUse(storageKey);

      if (isInUse) {
        protectedKeys.push(storageKey);
        continue;
      }

      keysToDelete.push(storageKey);
    }

    if (protectedKeys.length) {
      console.warn(
        `[ProjectService] Arquivos protegidos e não removidos do R2 (${context}):`,
        {
          keys: protectedKeys,
          total: protectedKeys.length,
        },
      );
    }

    if (!keysToDelete.length) {
      return;
    }

    try {
      await storage.deleteMany(keysToDelete);

      console.info(`[ProjectService] Arquivos removidos do R2 (${context}):`, {
        keys: keysToDelete,
        total: keysToDelete.length,
      });
    } catch (error) {
      console.error(
        `[ProjectService] Falha ao remover arquivos do R2 (${context}). Possíveis arquivos órfãos:`,
        {
          keys: keysToDelete,
          total: keysToDelete.length,
          error,
        },
      );
    }
  }

  async create(data: CreateProjectInput) {
    const normalizedSlug = normalizeProjectSlug(data.slug);

    if (normalizedSlug.length < 3) {
      throw new AppError(
        "O slug precisa resultar em pelo menos 3 caracteres válidos.",
        400,
      );
    }

    const slugAlreadyExists =
      await this.repository.existsBySlug(normalizedSlug);

    if (slugAlreadyExists) {
      throw new AppError("Já existe um projeto utilizando este slug.", 409);
    }

    if (data.featuredImage && !data.featuredImageStorageKey) {
      throw new AppError(
        "A imagem de capa precisa possuir uma chave de armazenamento.",
        400,
      );
    }

    if (data.featuredImageStorageKey && !data.featuredImage) {
      throw new AppError(
        "A chave de armazenamento da capa exige uma URL de imagem.",
        400,
      );
    }

    if (data.featuredImageStorageKey) {
      await this.validateProjectImage(data.featuredImageStorageKey);
    }

    const settings = await this.settingsService.get();

    if (data.images.length > settings.maxProjectImages) {
      throw new AppError(
        `Um projeto pode ter no máximo ${settings.maxProjectImages} imagens na galeria.`,
        400,
      );
    }

    const storageKeys = data.images.map((image) => image.storageKey);

    const uniqueStorageKeys = new Set(storageKeys);

    if (uniqueStorageKeys.size !== storageKeys.length) {
      throw new AppError("A galeria não pode conter imagens duplicadas.", 400);
    }

    if (
      data.featuredImageStorageKey &&
      uniqueStorageKeys.has(data.featuredImageStorageKey)
    ) {
      throw new AppError(
        "A imagem de capa não pode ser repetida na galeria.",
        400,
      );
    }

    for (const image of data.images) {
      await this.validateProjectImage(image.storageKey);
    }

    const normalizedData = {
      ...data,
      slug: normalizedSlug,
    };

    try {
      return await this.repository.create(normalizedData);
    } catch (error) {
      /*
       * Se o banco falhar depois que os
       * uploads já foram feitos, tentamos
       * remover os arquivos recém-enviados
       * para evitar órfãos.
       */
      const uploadedStorageKeys = [
        ...(data.featuredImageStorageKey ? [data.featuredImageStorageKey] : []),
        ...storageKeys,
      ];

      await this.deleteStorageKeys(
        uploadedStorageKeys,
        "rollback após falha na criação",
      );

      throw error;
    }
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
    const project = await this.repository.findById(id);

    if (!project) {
      throw new AppError("Projeto não encontrado.", 404);
    }

    return project;
  }

  async findBySlug(slug: string) {
    const normalizedSlug = normalizeProjectSlug(slug);

    if (normalizedSlug.length < 3) {
      throw new AppError("Slug inválido.", 400);
    }

    const project = await this.repository.findBySlug(normalizedSlug);

    if (!project) {
      throw new AppError("Projeto não encontrado.", 404);
    }

    return project;
  }

  async update(id: string, data: UpdateProjectInput) {
    const currentProject = await this.findById(id);

    let normalizedData = data;

    if (data.slug !== undefined) {
      const normalizedSlug = normalizeProjectSlug(data.slug);

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

      normalizedData = {
        ...data,
        slug: normalizedSlug,
      };
    }

    if (
      normalizedData.featuredImage !== undefined &&
      normalizedData.featuredImage &&
      !normalizedData.featuredImageStorageKey &&
      !currentProject.featuredImageStorageKey
    ) {
      throw new AppError(
        "A imagem de capa precisa possuir uma chave de armazenamento.",
        400,
      );
    }

    if (
      normalizedData.featuredImageStorageKey !== undefined &&
      normalizedData.featuredImageStorageKey &&
      normalizedData.featuredImage === undefined &&
      !currentProject.featuredImage
    ) {
      throw new AppError(
        "A chave de armazenamento da capa exige uma URL de imagem.",
        400,
      );
    }

    if (normalizedData.featuredImageStorageKey) {
      await this.validateProjectImage(normalizedData.featuredImageStorageKey);
    }

    const oldFeaturedImageStorageKey = currentProject.featuredImageStorageKey;

    const newFeaturedImageStorageKey = normalizedData.featuredImageStorageKey;

    const featuredImageChanged =
      newFeaturedImageStorageKey !== undefined &&
      newFeaturedImageStorageKey !== oldFeaturedImageStorageKey;

    let updatedProject;

    try {
      updatedProject = await this.repository.update(id, normalizedData);
    } catch (error) {
      /*
       * Se uma nova capa foi enviada para
       * o R2, mas a atualização do banco
       * falhou, ela não ficou vinculada
       * ao projeto.
       */
      if (featuredImageChanged && newFeaturedImageStorageKey) {
        await this.deleteStorageKeys(
          [newFeaturedImageStorageKey],
          "rollback após falha na atualização",
        );
      }

      throw error;
    }

    /*
     * O banco já aponta para a nova capa.
     * Só agora removemos a antiga.
     */
    if (featuredImageChanged && oldFeaturedImageStorageKey) {
      await this.deleteStorageKeys(
        [oldFeaturedImageStorageKey],
        "substituição da capa",
      );
    }

    return updatedProject;
  }

  async replaceImages(id: string, images: CreateProjectInput["images"]) {
    const project = await this.findById(id);

    const settings = await this.settingsService.get();

    if (images.length > settings.maxProjectImages) {
      throw new AppError(
        `Um projeto pode ter no máximo ${settings.maxProjectImages} imagens na galeria.`,
        400,
      );
    }

    if (
      project.featuredImageStorageKey &&
      images.some(
        (image) => image.storageKey === project.featuredImageStorageKey,
      )
    ) {
      throw new AppError(
        "A imagem de capa não pode ser repetida na galeria.",
        400,
      );
    }

    const newStorageKeys = images.map((image) => image.storageKey);

    const uniqueStorageKeys = new Set(newStorageKeys);

    if (uniqueStorageKeys.size !== newStorageKeys.length) {
      throw new AppError("A galeria não pode conter imagens duplicadas.", 400);
    }

    for (const image of images) {
      await this.validateProjectImage(image.storageKey);
    }

    const oldStorageKeys = project.images
      .map((image) => image.storageKey)
      .filter(Boolean);

    const storageKeysToDelete = oldStorageKeys.filter(
      (key) => !uniqueStorageKeys.has(key),
    );

    let updatedProject;

    try {
      updatedProject = await this.repository.replaceImages(id, images);
    } catch (error) {
      /*
       * As novas imagens já estavam
       * no R2, mas não foram vinculadas
       * ao projeto porque o banco falhou.
       */
      const oldStorageKeySet = new Set(oldStorageKeys);

      const newFilesToRollback = newStorageKeys.filter(
        (key) => !oldStorageKeySet.has(key),
      );

      await this.deleteStorageKeys(
        newFilesToRollback,
        "rollback após falha na galeria",
      );

      throw error;
    }

    /*
     * O banco já contém a nova galeria.
     * Agora podemos remover os arquivos
     * que deixaram de ser utilizados.
     */
    await this.deleteStorageKeys(
      storageKeysToDelete,
      "substituição da galeria",
    );

    return updatedProject;
  }

  async remove(id: string) {
    const project = await this.findById(id);

    const storageKeys = [
      ...project.images.map((image) => image.storageKey),
      ...(project.featuredImageStorageKey
        ? [project.featuredImageStorageKey]
        : []),
    ].filter(Boolean);

    /*
     * Primeiro removemos o projeto do
     * banco. Se o R2 falhar, o projeto
     * já não existe mais e podemos tratar
     * o arquivo como órfão.
     */
    await this.repository.delete(id);

    await this.deleteStorageKeys(storageKeys, "exclusão do projeto");
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
    const project = await this.findById(id);

    if (!project.published) {
      throw new AppError(
        "Somente projetos publicados podem ser destacados.",
        400,
      );
    }

    if (project.featured) {
      return project;
    }

    const featuredProject = await this.repository.feature(id);

    if (!featuredProject) {
      throw new AppError(
        "Já existem 5 projetos em destaque. Remova um destaque antes de adicionar outro.",
        400,
      );
    }

    return featuredProject;
  }

  async unfeature(id: string) {
    await this.findById(id);

    return this.repository.unfeature(id);
  }

  async updateFeaturedImage(
    id: string,
    featuredImage: string | null,
    featuredImageStorageKey: string | null,
  ) {
    const project = await this.findById(id);

    const oldStorageKey = project.featuredImageStorageKey;

    if (featuredImageStorageKey) {
      await this.validateProjectImage(featuredImageStorageKey);
    }

    const storageKeyChanged = featuredImageStorageKey !== oldStorageKey;

    let updatedProject;

    try {
      updatedProject = await this.repository.updateFeaturedImage(
        id,
        featuredImage,
        featuredImageStorageKey,
      );
    } catch (error) {
      /*
       * A nova imagem foi enviada ao R2,
       * mas não foi vinculada ao projeto.
       */
      if (storageKeyChanged && featuredImageStorageKey) {
        await this.deleteStorageKeys(
          [featuredImageStorageKey],
          "rollback após falha na capa",
        );
      }

      throw error;
    }

    if (storageKeyChanged && oldStorageKey) {
      await this.deleteStorageKeys([oldStorageKey], "substituição da capa");
    }

    return updatedProject;
  }

  async deleteImage(projectId: string, imageId: string) {
    await this.findById(projectId);

    const image = await this.repository.findImageById(imageId);

    if (!image) {
      throw new AppError("Imagem não encontrada.", 404);
    }

    if (image.projectId !== projectId) {
      throw new AppError("A imagem não pertence a este projeto.", 400);
    }

    const deletedImage = await this.repository.deleteImage(imageId);

    await this.deleteStorageKeys([image.storageKey], "exclusão de imagem");

    return deletedImage;
  }

  async generateUploadUrl(fileName: string, fileType: string) {
    if (!PROJECT_ALLOWED_IMAGE_TYPES.includes(fileType)) {
      throw new AppError("Formato de imagem não permitido.", 400);
    }

    if (!fileName || !fileName.trim()) {
      throw new AppError("Nome do arquivo não informado.", 400);
    }

    return storage.generateSignedUrl({
      folder: "projects",
      fileName: fileName.trim(),
      fileType,
    });
  }

  async findOrphanedStorageObjects() {
    const [objects, usedStorageKeys] = await Promise.all([
      storage.listObjects("projects/"),
      this.repository.getUsedStorageKeys(),
    ]);

    const usedKeys = new Set(usedStorageKeys);

    const orphanedObjects = objects.filter(
      (object) => object.key && !usedKeys.has(object.key),
    );

    return {
      totalObjects: objects.length,
      totalUsed: objects.filter(
        (object) => object.key && usedKeys.has(object.key),
      ).length,
      totalOrphaned: orphanedObjects.length,
      orphanedObjects,
    };
  }

  async cleanupOrphanedStorageObjects() {
    const orphanReport = await this.findOrphanedStorageObjects();

    const now = Date.now();

    const MINIMUM_AGE_MS = 24 * 60 * 60 * 1000;

    const safeToDelete = orphanReport.orphanedObjects.filter((object) => {
      if (!object.lastModified) {
        return false;
      }

      const age = now - object.lastModified.getTime();

      return age >= MINIMUM_AGE_MS;
    });

    const skippedRecent = orphanReport.orphanedObjects.filter((object) => {
      if (!object.lastModified) {
        return true;
      }

      const age = now - object.lastModified.getTime();

      return age < MINIMUM_AGE_MS;
    });

    const keysToDelete = safeToDelete
      .map((object) => object.key)
      .filter((key) => key.startsWith("projects/"));

    if (!keysToDelete.length) {
      return {
        totalObjects: orphanReport.totalObjects,

        totalUsed: orphanReport.totalUsed,

        totalOrphaned: orphanReport.totalOrphaned,

        totalSkippedRecent: skippedRecent.length,

        totalDeleted: 0,

        deletedObjects: [],

        skippedObjects: skippedRecent,
      };
    }

    await this.deleteStorageKeys(keysToDelete, "limpeza de arquivos órfãos");

    return {
      totalObjects: orphanReport.totalObjects,

      totalUsed: orphanReport.totalUsed,

      totalOrphaned: orphanReport.totalOrphaned,

      totalSkippedRecent: skippedRecent.length,

      totalDeleted: keysToDelete.length,

      deletedObjects: keysToDelete,

      skippedObjects: skippedRecent,
    };
  }
}

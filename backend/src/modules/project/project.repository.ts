import { Project } from "@prisma/client";
import { prisma } from "../../database/prisma";
import { CreateProjectInput, UpdateProjectInput } from "./project.schema";

export class ProjectRepository {
  async create(data: CreateProjectInput): Promise<Project> {
    return prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,

        category: data.category,

        city: data.city,
        state: data.state,

        year: data.year,

        area: data.area,

        description: data.description,

        content: data.content,

        featuredImage:
          data.featuredImage,

        featuredImageStorageKey:
          data.featuredImageStorageKey,

        videoUrl: data.videoUrl,

        published: data.published,

        featured: data.featured,

        images: {
          create: data.images.map(
            (image) => ({
              imageUrl:
                image.imageUrl,

              storageKey:
                image.storageKey,

              alt: image.alt,

              sortOrder:
                image.sortOrder,
            })
          ),
        },
      },

      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });
  }

  async findAll() {
    return prisma.project.findMany({
      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findPublished() {
    return prisma.project.findMany({
      where: {
        published: true,
      },

      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.project.findUnique({
      where: {
        id,
      },

      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.project.findFirst({
      where: {
        slug,
        published: true,
      },

      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });
  }

  async findAnyBySlug(slug: string) {
    return prisma.project.findUnique({
      where: {
        slug,
      },
    });
  }

  async findImageById(imageId: string) {
    return prisma.projectImage.findUnique({
      where: {
        id: imageId,
      },
    });
  }

  async update(id: string, data: UpdateProjectInput) {
    return prisma.project.update({
      where: {
        id,
      },

      data: {
        ...(data.title !== undefined && {
          title: data.title,
        }),

        ...(data.slug !== undefined && {
          slug: data.slug,
        }),

        ...(data.category !== undefined && {
          category: data.category,
        }),

        ...(data.city !== undefined && {
          city: data.city,
        }),

        ...(data.state !== undefined && {
          state: data.state,
        }),

        ...(data.year !== undefined && {
          year: data.year,
        }),

        ...(data.area !== undefined && {
          area: data.area,
        }),

        ...(data.description !== undefined && {
          description: data.description,
        }),

        ...(data.content !== undefined && {
          content: data.content,
        }),

        ...(data.featuredImage !== undefined && {
          featuredImage: data.featuredImage,
        }),

        ...(data.featuredImageStorageKey !== undefined && {
          featuredImageStorageKey:
            data.featuredImageStorageKey,
        }),

        ...(data.videoUrl !== undefined && {
          videoUrl: data.videoUrl,
        }),

        ...(data.published !== undefined && {
          published: data.published,
        }),

        ...(data.featured !== undefined && {
          featured: data.featured,
        }),
      },

      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });
  }

  async delete(id: string) {
    return prisma.project.delete({
      where: {
        id,
      },
    });
  }

  async replaceImages(
    projectId: string,
    images: CreateProjectInput["images"]
  ) {
    return prisma.project.update({
      where: {
        id: projectId,
      },

      data: {
        images: {
          deleteMany: {},

          create: images.map((image) => ({
            imageUrl: image.imageUrl,
            storageKey: image.storageKey,
            alt: image.alt,
            sortOrder: image.sortOrder,
          })),
        },
      },

      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });
  }

  async existsBySlug(slug: string) {
    const count = await prisma.project.count({
      where: {
        slug,
      },
    });

    return count > 0;
  }

  async count() {
    return prisma.project.count();
  }

  async countPublished() {
    return prisma.project.count({
      where: {
        published: true,
      },
    });
  }

  async countDrafts() {
    return prisma.project.count({
      where: {
        published: false,
      },
    });
  }

  async findFeatured(limit = 5) {
    return prisma.project.findMany({
      where: {
        featured: true,
        published: true,
      },

      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },

      orderBy: {
        updatedAt: "desc",
      },

      take: limit,
    });
  }

  async publish(id: string) {
    return prisma.project.update({
      where: {
        id,
      },
      data: {
        published: true,
      },
    });
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
    return prisma.$transaction(
      async (transaction) => {
        const featuredCount =
          await transaction.project.count({
            where: {
              featured: true,
              published: true,
            },
          });

        if (featuredCount >= 5) {
          return null;
        }

        return transaction.project.update({
          where: {
            id,
          },
          data: {
            featured: true,
          },
        });
      },
      {
        isolationLevel:
          "Serializable",
      }
    );
  }

  async unfeature(id: string) {
    return prisma.project.update({
      where: {
        id,
      },
      data: {
        featured: false,
      },
    });
  }

  async updateFeaturedImage(
    id: string,
    featuredImage: string | null,
    featuredImageStorageKey: string | null
  ) {
    return prisma.project.update({
      where: {
        id,
      },
      data: {
        featuredImage,
        featuredImageStorageKey,
      },

      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });
  }

  async deleteImage(imageId: string) {
    return prisma.projectImage.delete({
      where: {
        id: imageId,
      },
    });
  }

  async findLatestProjects(limit: number) {
    return prisma.project.findMany({
      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      take: limit,
    });

  }


  async countFeatured() {
    return prisma.project.count({
      where: {
        featured: true,
        published: true,
      },
    });
  }

  async isStorageKeyInUse(
    storageKey: string
  ): Promise<boolean> {
    const [featuredProject, galleryImage] =
      await Promise.all([
        prisma.project.findFirst({
          where: {
            featuredImageStorageKey:
              storageKey,
          },
          select: {
            id: true,
          },
        }),

        prisma.projectImage.findFirst({
          where: {
            storageKey,
          },
          select: {
            id: true,
          },
        }),
      ]);

    return Boolean(
      featuredProject ||
      galleryImage
    );
  }

  async getUsedStorageKeys(): Promise<string[]> {
    const [projects, images] =
      await Promise.all([
        prisma.project.findMany({
          where: {
            featuredImageStorageKey: {
              not: null,
            },
          },
          select: {
            featuredImageStorageKey: true,
          },
        }),

        prisma.projectImage.findMany({
          select: {
            storageKey: true,
          },
        }),
      ]);

    return [
      ...projects
        .map(
          (project) =>
            project.featuredImageStorageKey
        )
        .filter(
          (key): key is string =>
            Boolean(key)
        ),

      ...images
        .map(
          (image) => image.storageKey
        )
        .filter(
          (key) => Boolean(key)
        ),
    ];
  }
}


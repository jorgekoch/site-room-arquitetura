import { BlogPost, Prisma } from "@prisma/client";
import { prisma } from "../../database/prisma";
import { CreateBlogPostInput, UpdateBlogPostInput } from "./blog.schema";

export class BlogRepository {
  async create(data: CreateBlogPostInput): Promise<BlogPost> {
    return prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage ?? null,
        author: data.author,
        category: data.category,
        publishedAt: new Date(data.publishedAt),
        readingTime: data.readingTime,
        status: data.status,
        youtubeUrl: data.youtubeUrl ?? null,
      },
    });
  }

  async findAll() {
    return prisma.blogPost.findMany({
      orderBy: {
        publishedAt: "desc",
      },
    });
  }

  async findPublished() {
    return prisma.blogPost.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: {
        publishedAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.blogPost.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string) {
    return prisma.blogPost.findFirst({
      where: {
        slug,
        status: "PUBLISHED",
      },
    });
  }

  async findAnyBySlug(slug: string) {
    return prisma.blogPost.findUnique({
      where: { slug },
    });
  }

  async update(id: string, data: UpdateBlogPostInput) {
    return prisma.blogPost.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title }),
        ...(data.slug !== undefined && { slug: data.slug }),
        ...(data.excerpt !== undefined && { excerpt: data.excerpt }),
        ...(data.content !== undefined && { content: data.content }),
        ...(data.coverImage !== undefined && {
          coverImage: data.coverImage ?? null,
        }),
        ...(data.author !== undefined && { author: data.author }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.publishedAt !== undefined && {
          publishedAt: new Date(data.publishedAt),
        }),
        ...(data.readingTime !== undefined && {
          readingTime: data.readingTime,
        }),
        ...(data.status !== undefined && { status: data.status }),
        ...(data.youtubeUrl !== undefined && {
          youtubeUrl: data.youtubeUrl ?? null,
        }),
      },
    });
  }

  async delete(id: string) {
    return prisma.blogPost.delete({
      where: { id },
    });
  }
}

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  category: string;
  publishedAt: string;
  readingTime: number;
  status: "draft" | "published";
  youtubeUrl?: string;
};

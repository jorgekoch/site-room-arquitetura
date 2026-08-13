/*
  Warnings:

  - You are about to drop the column `youtubeUrl` on the `blog_posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "blog_posts" DROP COLUMN "youtubeUrl";

-- CreateIndex
CREATE INDEX "admin_users_isActive_approved_idx" ON "admin_users"("isActive", "approved");

-- CreateIndex
CREATE INDEX "blog_posts_status_publishedAt_idx" ON "blog_posts"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "project_images_storageKey_idx" ON "project_images"("storageKey");

-- CreateIndex
CREATE INDEX "projects_published_createdAt_idx" ON "projects"("published", "createdAt");

-- CreateIndex
CREATE INDEX "projects_featured_published_updatedAt_idx" ON "projects"("featured", "published", "updatedAt");

-- CreateIndex
CREATE INDEX "projects_featuredImageStorageKey_idx" ON "projects"("featuredImageStorageKey");

-- CreateIndex
CREATE INDEX "proposal_requests_status_createdAt_idx" ON "proposal_requests"("status", "createdAt");

-- CreateIndex
CREATE INDEX "proposal_requests_projectType_createdAt_idx" ON "proposal_requests"("projectType", "createdAt");

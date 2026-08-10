import { Router } from "express";

import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { ensureOwner } from "../../middlewares/ensureOwner";
import { ProjectController } from "./project.controller";

const projectRoutes = Router();

const controller =
  new ProjectController();

/*
 * Rotas públicas
 */

projectRoutes.get(
  "/published",
  (request, response) =>
    controller.listPublished(
      request,
      response
    )
);

projectRoutes.get(
  "/featured",
  (request, response) =>
    controller.listFeatured(
      request,
      response
    )
);

projectRoutes.get(
  "/slug/:slug",
  (request, response) =>
    controller.showBySlug(
      request,
      response
    )
);

/*
 * Rotas administrativas
 */

projectRoutes.use(
  ensureAuthenticated
);

/*
 * Uploads
 */

projectRoutes.post(
  "/upload-url",
  (request, response) =>
    controller.getUploadUrl(
      request,
      response
    )
);

/*
 * CRUD
 */

projectRoutes.get(
  "/",
  (request, response) =>
    controller.list(
      request,
      response
    )
);

projectRoutes.post(
  "/",
  (request, response) =>
    controller.create(
      request,
      response
    )
);

projectRoutes.get(
  "/storage/orphans",
  ensureOwner,
  (request, response) =>
    controller.findOrphanedStorageObjects(
      request,
      response
    )
);

projectRoutes.get(
  "/:id",
  (request, response) =>
    controller.show(
      request,
      response
    )
);

projectRoutes.patch(
  "/:id",
  (request, response) =>
    controller.update(
      request,
      response
    )
);

projectRoutes.patch(
  "/:id/images",
  (request, response) =>
    controller.replaceImages(
      request,
      response
    )
);

projectRoutes.delete(
  "/:id",
  (request, response) =>
    controller.remove(
      request,
      response
    )
);

/*
 * Publicação
 */

projectRoutes.patch(
  "/:id/publish",
  (request, response) =>
    controller.publish(
      request,
      response
    )
);

projectRoutes.patch(
  "/:id/unpublish",
  (request, response) =>
    controller.unpublish(
      request,
      response
    )
);

/*
 * Destaque
 */

projectRoutes.patch(
  "/:id/feature",
  (request, response) =>
    controller.feature(
      request,
      response
    )
);

projectRoutes.patch(
  "/:id/unfeature",
  (request, response) =>
    controller.unfeature(
      request,
      response
    )
);

projectRoutes.patch(
  "/:id/featured-image",
  (request, response) =>
    controller.updateFeaturedImage(
      request,
      response
    )
);

/*
 * Imagens
 */

projectRoutes.delete(
  "/:id/images/:imageId",
  (request, response) =>
    controller.deleteImage(
      request,
      response
    )
);

export { projectRoutes };
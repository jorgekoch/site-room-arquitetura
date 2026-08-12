import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";
import { BlogController } from "./blog.controller";

const blogRoutes = Router();
const controller = new BlogController();

blogRoutes.get("/published", (request, response) =>
  controller.listPublished(request, response),
);

blogRoutes.get("/slug/:slug", (request, response) =>
  controller.showBySlug(request, response),
);

blogRoutes.use(ensureAuthenticated);

blogRoutes.post("/upload-url", (request, response) =>
  controller.getUploadUrl(request, response),
);

blogRoutes.get("/", (request, response) => controller.list(request, response));

blogRoutes.post("/", (request, response) =>
  controller.create(request, response),
);

blogRoutes.get("/:id", (request, response) =>
  controller.show(request, response),
);

blogRoutes.patch("/:id", (request, response) =>
  controller.update(request, response),
);

blogRoutes.delete("/:id", (request, response) =>
  controller.remove(request, response),
);

export { blogRoutes };

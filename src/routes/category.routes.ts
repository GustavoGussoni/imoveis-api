import { Router } from "express";
import {
  createCategoryController,
  listCategoryController,
  listRealEstateByCategoryController,
} from "../controllers/category.controllers";
import ensureCategoryExistsMiddleware from "../middlewares/ensureCategoryExists.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middleware";
import { categorySchema } from "../schemas/category.schemas";
const categoryRoutes: Router = Router();

categoryRoutes.post(
  "",
  ensureDataIsValidMiddleware(categorySchema),
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  ensureCategoryExistsMiddleware,
  createCategoryController
);
categoryRoutes.get("", listCategoryController);
categoryRoutes.get("/:id/realEstate", listRealEstateByCategoryController);

export default categoryRoutes;

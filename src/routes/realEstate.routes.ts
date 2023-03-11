import { Router } from "express";
import {
  createRealEstateController,
  listRealEstateController,
} from "../controllers/realEstate.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureRealEstateAddressExistsMiddleware from "../middlewares/ensureRealEstateAddressExists.middleware";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import ensureUserIsAdminMiddleware from "../middlewares/ensureUserIsAdmin.middleware";
import { realEstateSchema } from "../schemas/realEstate.schemas";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  ensureDataIsValidMiddleware(realEstateSchema),
  ensureRealEstateAddressExistsMiddleware,
  ensureTokenIsValidMiddleware,
  ensureUserIsAdminMiddleware,
  createRealEstateController
);
realEstateRoutes.get("", listRealEstateController);
export default realEstateRoutes;

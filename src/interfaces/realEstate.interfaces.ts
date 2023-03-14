import { z } from "zod";
import {
  realEstateSchema,
  returnMultipleRealEstateSchema,
  returnRealEstateSchema,
} from "../schemas/realEstate.schemas";

type IRealEstate = z.infer<typeof realEstateSchema>;

type IRealEstateReturn = z.infer<typeof returnRealEstateSchema>;
type IMultipleRealEstate = z.infer<typeof returnMultipleRealEstateSchema>;
export { IRealEstate, IRealEstateReturn, IMultipleRealEstate };

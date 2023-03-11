import { z } from "zod";
import {
  realEstateSchema,
  realEstateSchemaAddressAsNumber,
  returnMultipleRealEstateSchema,
  returnRealEstateSchema,
} from "../schemas/realEstate.schemas";

type IRealEstate = z.infer<typeof realEstateSchema>;
type IRealEstateAddressAsNumber = z.infer<
  typeof realEstateSchemaAddressAsNumber
>;
type IRealEstateReturn = z.infer<typeof returnRealEstateSchema>;
type IMultipleRealEstate = z.infer<typeof returnMultipleRealEstateSchema>;
export {
  IRealEstate,
  IRealEstateReturn,
  IRealEstateAddressAsNumber,
  IMultipleRealEstate,
};

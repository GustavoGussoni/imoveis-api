import { Request, Response } from "express";
import createRealEstateService from "../services/realEstate/createRealEstate.service";
import listRealEstateService from "../services/realEstate/listRealEstate.service";

const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstateData = req.body;

  const newRealEstate = await createRealEstateService(realEstateData);

  return res.status(201).json(newRealEstate);
};

const listRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstate = await listRealEstateService();

  return res.json(realEstate);
};
export { createRealEstateController, listRealEstateController };

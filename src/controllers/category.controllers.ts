import { Request, Response } from "express";
import { ICategory } from "../interfaces/category.interfaces";
import createCategoryService from "../services/category/createCategory.service";
import listCategoryService from "../services/category/listCategory.service";
import listRealEstateByCategoryService from "../services/category/listRealEstateByCategory.service";

const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: ICategory = req.body;
  const category = await createCategoryService(categoryData);

  return res.status(201).json(category);
};

const listCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categories = await listCategoryService();

  return res.json(categories);
};

const listRealEstateByCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryId = parseInt(req.params.id);

  const findCategory = await listRealEstateByCategoryService(categoryId);

  return res.json(findCategory);
};

export {
  createCategoryController,
  listCategoryController,
  listRealEstateByCategoryController,
};

import { apiRoutes } from "../config/api";
import { $api } from "./index";

const getCategory = async (data) => {
  const response = await $api.post(apiRoutes.CATEGORY_ONE, data);
  return response?.data;
};

const getCategories = async (data) => {
  const response = await $api.get(apiRoutes.CATEGORY_ALL, { params: data });
  return response?.data;
};

export { getCategory, getCategories };

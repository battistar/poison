import axios, { AxiosResponse } from "axios";
import CategoriesAPI from "../models/http/CategoryList";
import DrinkDetailsListAPI from "../models/http/DrinkDetailsList";
import DrinkListAPI from "../models/http/DrinkList";

const client = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json/v1/1/",
});

export const getCategories = async (): Promise<AxiosResponse<CategoriesAPI>> => {
  const params = {
    c: "list",
  };

  return await client.get<CategoriesAPI>("/list.php", { params: params });
};

export const filterByCategory = async (query: string): Promise<AxiosResponse<DrinkListAPI>> => {
  const params = {
    c: query
  }

  return await client.get<DrinkListAPI>("filter.php", {params: params});
}

export const getRandom = async (): Promise<AxiosResponse<DrinkDetailsListAPI>> => {
  return await client.get<DrinkDetailsListAPI>("random.php");
};

import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import * as httpClient from "../http/client"
import Category from "../models/Category";
import { mapCategories } from "../utils/mapper";

export const loader = async (): Promise<Category[] | Response> => {
  const result = await httpClient.getCategories();

  if (result.status >= 200 && result.status < 300) {
    if (!result.data) {
      throw new Response("Not Found", { status: 404 });
    }

    const categoryList = mapCategories(result.data);

    return categoryList;
  } else {
    throw new Response(result.statusText, { status: result.status });
  }
};

const Root = (): JSX.Element => {
  const categoryList = useLoaderData() as Category[] | undefined;

  return (
    <>
      <Header categoryList={categoryList} />
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Root;

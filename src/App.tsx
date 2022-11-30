import React from "react";
import * as httpClient from "./http/client";
import DrinkPage from "./models/DrinkPage";
import { mapCategories, mapDrinkList } from "./utils/mapper";

const App = () => {
  const [data, setData] = React.useState<DrinkPage>({ categoryList: [], drinkList: [] });

  React.useEffect(() => {
    const fetchData = async () => {
      const getCategoriesResult = await httpClient.getCategories();
      const categoryList = mapCategories(getCategoriesResult.data);

      if (getCategoriesResult.status >= 200 && getCategoriesResult.status < 300) {
        const getDrinksResult = await httpClient.filterByCategory(categoryList[0]);
        const drinkList = mapDrinkList(getDrinksResult.data);

        if (getDrinksResult.status >= 200 && getDrinksResult.status < 300) {
          setData({ categoryList: categoryList, drinkList: drinkList })

          console.log({ categoryList: categoryList, drinkList: drinkList });
        }
      }
    };

    fetchData();
  }, []);

  return <div></div>;
};

export default App;

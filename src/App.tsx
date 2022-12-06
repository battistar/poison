import React from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import * as httpClient from "./http/client";
import Category from "./models/Category";
import DrinkPage from "./models/DrinkPage";
import { mapCategories, mapDrinkList } from "./utils/mapper";

const App = () => {
  const [data, setData] = React.useState<DrinkPage>({
    categoryList: [],
    drinkList: [],
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const getCategoriesResult = await httpClient.getCategories();

      if (
        getCategoriesResult.status >= 200 &&
        getCategoriesResult.status < 300
      ) {
        const categoryList = mapCategories(getCategoriesResult.data);
        const getDrinksResult = await httpClient.filterByCategory(
          categoryList[0]
        );

        if (getDrinksResult.status >= 200 && getDrinksResult.status < 300) {
          const drinkList = mapDrinkList(getDrinksResult.data);
          setData({ categoryList: categoryList, drinkList: drinkList });
        }
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = async (category: Category): Promise<void> => {
    const result = await httpClient.filterByCategory(category);

    if (result.status >= 200 && result.status < 300) {
      const drinkList = mapDrinkList(result.data);

      setData((prevData) => {
        return {
          ...prevData,
          drinkList: drinkList,
        };
      });
    }
  };

  return (
    <>
      <Header
        categoryList={data.categoryList}
        onCategoryClick={handleCategoryClick}
      />
      <main>
        <div className="container">
          <div className="row">
            {data.drinkList.length > 0 &&
              data.drinkList.map((drink) => {
                return (
                  <div key={drink.id} className="col-l-3 col-m-4 col-s-6">
                    <Card drink={drink} />
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </>
  );
};

export default App;

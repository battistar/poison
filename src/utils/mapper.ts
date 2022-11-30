import Category from "../models/Category";
import Drink from "../models/Drink";
import DrinkDetails from "../models/DrinkDetails";
import CategoryListAPI from "../models/http/CategoryList";
import DrinkDetailsAPI from "../models/http/DrinkDetails";
import DrinkDetailsListAPI from "../models/http/DrinkDetailsList";
import DrinkListAPI from "../models/http/DrinkList";
import Ingredient from "../models/Ingredient";

export const mapCategories = (response: CategoryListAPI): Category[] => {
  return response.drinks.map(({ strCategory }) => {
    return strCategory;
  });
};

const buildIngredients = (response: DrinkDetailsAPI): Ingredient[] => {
  const ingredients: Ingredient[] = [];

  const i = 1;
  while (true) {
    const name = response[`strIngredient${i}`];
    const measure = response[`strMeasure${i}`];

    if (name === undefined) {
      break;
    }

    const ingredient: Ingredient = {
      name: name,
      measure: measure,
    };

    ingredients.push(ingredient);
  }

  return ingredients;
};

export const mapDrinkDetailsList = (response: DrinkDetailsListAPI): DrinkDetails[] => {
  if (response.drinks === null) {
    return [];
  }
  
  const drinks: DrinkDetails[] = response.drinks.map((drinkAPI) => {
    const drink: DrinkDetails = {
      id: drinkAPI.idDrink,
      name: drinkAPI.strDrink,
      instructions: drinkAPI.strInstructions,
      ingredients: buildIngredients(drinkAPI),
      imageURL: drinkAPI.strDrinkThumb,
      category: drinkAPI.strCategory,
    };

    return drink;
  });

  return drinks;
};

export const mapDrinkList = (response: DrinkListAPI): Drink[] => {
  if (response.drinks === null) {
    return [];
  }

  const drinks: Drink[] = response.drinks.map((drinkAPI) => {
    const drink: Drink = {
      id: drinkAPI.idDrink,
      name: drinkAPI.strDrink,
      imageURL: drinkAPI.strDrinkThumb,
    };

    return drink;
  });

  return drinks;
};
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

  let i = 1;
  while (true) {
    const name = response[`strIngredient${i}` as keyof DrinkDetailsAPI] as string;
    const measure = response[`strMeasure${i}` as keyof DrinkDetailsAPI] as string;

    if (name === null) {
      break;
    }

    const ingredient: Ingredient = {
      name: name.trim(),
      measure: measure.trim(),
    };

    ingredients.push(ingredient);

    i++;
  }

  return ingredients;
};

export const mapDrinkDetailsList = (response: DrinkDetailsListAPI): DrinkDetails[] => {
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
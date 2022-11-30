import Category from "./Category";
import Ingredient from "./Ingredient";

interface DrinkDetails {
    id: number;
    name: string;
    category: Category;
    instructions: string;
    ingredients: Ingredient[];
    imageURL: string;
}

export default DrinkDetails;
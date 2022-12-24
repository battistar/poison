import { redirect, LoaderFunctionArgs, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import Card from '../components/Card';
import * as httpClient from '../http/client';
import Drink from '../models/Drink';
import { mapCategories, mapDrinkList } from '../utils/mapper';
import { fromURLParams, toURLParams } from '../utils/urlParamsBeautify';

export const loader = async ({ params }: LoaderFunctionArgs): Promise<Drink[] | Response> => {
  if (params.category) {
    const result = await httpClient.filterByCategory(fromURLParams(params.category));

    if (result.status >= 200 && result.status < 300) {
      if (!result.data) {
        throw new Response('Not Found', { status: 404 });
      }

      const drinkList = mapDrinkList(result.data);

      return drinkList;
    } else {
      throw new Response(result.statusText, { status: result.status });
    }
  } else {
    const result = await httpClient.getCategories();

    if (result.status >= 200 && result.status < 300) {
      if (!result.data) {
        throw new Response('Not Found', { status: 404 });
      }

      const categoryList = mapCategories(result.data);

      return redirect(`category/${toURLParams(categoryList[0])}`);
    } else {
      throw new Response(result.statusText, { status: result.status });
    }
  }
};

const DrinkList = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const drinkList = useLoaderData() as Drink[];

  const handleClick = (id: number) => (): void => {
    if (category) {
      navigate(`/category/${toURLParams(category)}/${id}`);
    }
  };

  return (
    <div className="row">
      {drinkList.length > 0 &&
        drinkList.map((drink) => {
          return (
            <div key={drink.id} className="col-l-3 col-m-4 col-s-6" onClick={handleClick(drink.id)}>
              <Card drink={drink} />
            </div>
          );
        })}
    </div>
  );
};

export default DrinkList;

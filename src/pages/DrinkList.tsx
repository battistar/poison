import Column from 'components/Column';
import Row from 'components/Row';
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

const DrinkList = (): JSX.Element => {
  const navigate = useNavigate();
  const { category } = useParams();
  const drinkList = useLoaderData() as Drink[];

  const handleClick = (id: number) => (): void => {
    if (category) {
      navigate(`/category/${toURLParams(category)}/${id}`);
    }
  };

  return (
    <Row>
      {drinkList.length > 0 &&
        drinkList.map((drink) => {
          return (
            <Column key={drink.id} s={6} m={4} l={3}>
              <Card drink={drink} onClick={handleClick(drink.id)} />
            </Column>
          );
        })}
    </Row>
  );
};

export default DrinkList;

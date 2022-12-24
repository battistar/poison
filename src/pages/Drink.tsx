import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { mapDrinkDetailsList } from '../utils/mapper';
import * as httpClient from '../http/client';
import DetailsCard from '../components/DetailsCard';
import DrinkDetails from '../models/DrinkDetails';

export const loader = async ({ params }: LoaderFunctionArgs): Promise<DrinkDetails | Response> => {
  if (params.id) {
    const result = await httpClient.getDrinkByID(parseInt(params.id));

    if (result.status >= 200 && result.status < 300) {
      if (!result.data) {
        throw new Response('Not Found', { status: 404 });
      }

      const drinkList = mapDrinkDetailsList(result.data);

      return drinkList[0];
    } else {
      throw new Response(result.statusText, { status: result.status });
    }
  }

  throw new Response('Not Found', { status: 404 });
};

const Drink = (): JSX.Element => {
  const drink = useLoaderData() as DrinkDetails;

  return <DetailsCard drink={drink} />;
};

export default Drink;

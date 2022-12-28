import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './pages/Error';
import DrinkList, { loader as drinkListLoader } from './pages/DrinkList';
import Drink, { loader as drinkLoader } from './pages/Drink';
import Root, { loader as rootLoader } from './pages/Root';

const basename = (): string => {
  if (process.env.NODE_ENV === 'production') {
    return '/poison';
  }

  return '/';
};

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
      loader: rootLoader,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <DrinkList />,
          loader: drinkListLoader,
        },
        {
          path: 'category/:category',
          element: <DrinkList />,
          loader: drinkListLoader,
        },
        {
          path: 'category/:category/:id',
          element: <Drink />,
          loader: drinkLoader,
        },
      ],
    },
  ],
  {
    basename: basename(),
  }
);

const App = (): JSX.Element => {
  return <RouterProvider router={router} />;
};

export default App;

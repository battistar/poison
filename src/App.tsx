import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './pages/Error';
import DrinkList, { loader as drinkListLoader } from './pages/DrinkList';
import Drink, { loader as drinkLoader } from './pages/Drink';
import Root, { loader as rootLoader } from './pages/Root';

const router = createBrowserRouter([
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
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

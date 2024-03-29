import Container from 'components/Container';
import { Outlet, useLoaderData, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import * as httpClient from '../http/client';
import Category from '../models/Category';
import { mapCategories } from '../utils/mapper';
import { useEffect } from 'react';

export const loader = async (): Promise<Category[] | Response> => {
  const result = await httpClient.getCategories();

  if (result.status >= 200 && result.status < 300) {
    if (!result.data) {
      throw new Response('Not Found', { status: 404 });
    }

    const categoryList = mapCategories(result.data);

    return categoryList;
  } else {
    throw new Response(result.statusText, { status: result.status });
  }
};

const Root = (): JSX.Element => {
  const categoryList = useLoaderData() as Category[] | undefined;
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="root">
      <Header categoryList={categoryList} />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default Root;

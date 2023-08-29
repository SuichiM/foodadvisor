import App from 'next/app';
import ErrorPage from 'next/error';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

/* import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
 */
import { GlobalProvider } from '../context/global';

import 'tailwindcss/tailwind.css';
import { getStrapiURL } from '../utils';
import { getLocalizedParams } from '../utils/localize';
import { AuthProvider } from '../context/auth';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const { global } = pageProps;

  if (global === null) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider globalData={{ global }}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </GlobalProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const { locale } = getLocalizedParams(appContext.ctx.query);

  const appProps = await App.getInitialProps(appContext);

  try {
    const res = await fetch(
      getStrapiURL(
        `/global?populate[navigation][populate]=*&populate[footer][populate][footerColumns][populate]=*&locale=${locale}`
      )
    );
    const globalData = await res.json();
    const globalDataAttributes = globalData.data.attributes;

    return { ...appProps, pageProps: { global: globalDataAttributes } };
  } catch (error) {
    return { ...appProps };
  }
};

export default MyApp;

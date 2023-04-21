import type { AppProps } from 'next/app';
import Head from 'next/head';

import { appWithTranslation } from '@demo/front/shared/i18n/appWithTranslation';

import '../styles/app.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to PES!</title>
      </Head>
      <div className="app">
        <Component {...pageProps} />
      </div>
    </>
  );
}
export default appWithTranslation(CustomApp);

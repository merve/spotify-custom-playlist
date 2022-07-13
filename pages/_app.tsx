import type { AppProps } from "next/app";
import { GlobalStyle } from "../components/global-style";
import Head from "next/head";
import { disableReactDevTools } from "../helpers/DisableDevToolsForProd";

if (process.env.NODE_ENV === "production") disableReactDevTools();

function MyApp({ Component, pageProps }: AppProps) {
  const renderProviders = (providers: any[], el: JSX.Element) => {
    return providers.reverse().reduce((CurrentEl, CurrentProvider) => {
      return <CurrentProvider>{CurrentEl}</CurrentProvider>;
    }, el);
  };

  return (
    <>
      {renderProviders(
        [],
        <>
          <GlobalStyle />
          <Head>
            <title>Song Recommender | Spotify</title>
            <meta name="msapplication-TileColor" content="#1DB954" />
            <meta name="theme-color" content="#ffffff"></meta>
          </Head>
          <Component {...pageProps} />
        </>
      )}
    </>
  );
}

export default MyApp;

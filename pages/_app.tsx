import type { AppProps } from "next/app";
import { GlobalStyle } from "../components/global-style";
import Head from "next/head";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Song Recommender</title>
        <meta name="msapplication-TileColor" content="#1DB954" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

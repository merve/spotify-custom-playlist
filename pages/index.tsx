import type { NextPage } from "next";
import Head from "next/head";
import Text from "../components/Text";
import styled from "styled-components";

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
`;

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spotify custom playlist</title>
        <meta
          name="description"
          content="Choose at least two songs you like and get your personalized playlist"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledHome>
        <Text
          tag="h1"
          type="h2"
          margin="96px auto 32px auto"
          textAlign="center"
          color="var(--color-white)"
        >
          Select songs for your special playlist
        </Text>
      </StyledHome>
    </>
  );
};

export default Home;

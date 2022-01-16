import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import Button from "../components/Button";
import Text from "../components/Text";

const Title = styled.h1`
  font-size: 100px;
  text-align: center;
  color: palevioletred;
`;
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Spotify custom playlist</title>
        <meta
          name="description"
          content="Choose at least two songs you like and get your personalized playlist"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Text type="body" margin="0 0 40px 0" textAlign="center">
          Questions fréquentes
        </Text>
        <Text tag="h1" type="body" margin="0 0 40px 0" textAlign="center">
          Questions fréquentes
        </Text>
        <Title>Make your own recommended list</Title>
        <Button>GET LIST</Button>
      </main>
    </div>
  );
};

export default Home;

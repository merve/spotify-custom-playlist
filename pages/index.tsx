import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import Button from "../components/Button";

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
        <Title>Make your own recommended list</Title>
        <Button>GET LIST</Button>
      </main>
    </div>
  );
};

export default Home;

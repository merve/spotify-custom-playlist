import type { NextPage } from "next";
import Head from "next/head";
import Text from "../components/Text";
import styled from "styled-components";
import SongCard from "../components/SongCard";
import { size } from "../components/global-style";
import Button from "../components/Button";

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
`;
const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
  max-width: 1000px;
  margin: 64px auto;
  @media ${size.maxDesktop} {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
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
        <Text
          tag="h2"
          type="h6"
          textAlign="center"
          fontWeight={300}
          color="var(--color-white)"
        >
          Choose at least two songs you like and get your personalized playlist
        </Text>
        <List>
          <SongCard
            img="https://i.scdn.co/image/ab67616d00001e028ff9ce48387873c883afa037"
            name="Playground (from the series Arcane League of Legends)"
            artists="Bea Miller"
            selected
          />
          <SongCard
            img="https://i.scdn.co/image/ab67616d00001e028ff9ce48387873c883afa037"
            name="Arcane League of Legends (Soundtrack from the Animated Series)"
            artists="Bea Miller"
          />
          <SongCard
            img="https://i.scdn.co/image/ab67616d00001e028ff9ce48387873c883afa037"
            name="Arcane League of Legends (Soundtrack from the Animated Series)"
            artists="Bea Miller"
          />
          <SongCard
            img="https://i.scdn.co/image/ab67616d00001e028ff9ce48387873c883afa037"
            name="Arcane League of Legends (Soundtrack from the Animated Series)"
            artists="Bea Miller"
          />
          <SongCard
            img="https://i.scdn.co/image/ab67616d00001e028ff9ce48387873c883afa037"
            name="Arcane League of Legends (Soundtrack from the Animated Series)"
            artists="Bea Miller"
          />
          <SongCard
            img="https://i.scdn.co/image/ab67616d00001e028ff9ce48387873c883afa037"
            name="Arcane League of Legends (Soundtrack from the Animated Series)"
            artists="Bea Miller"
          />
          <SongCard
            img="https://i.scdn.co/image/ab67616d00001e028ff9ce48387873c883afa037"
            name="Arcane League of Legends (Soundtrack from the Animated Series)"
            artists="Bea Miller"
          />
          <SongCard
            img="https://i.scdn.co/image/ab67616d00001e028ff9ce48387873c883afa037"
            name="Arcane League of Legends (Soundtrack from the Animated Series)"
            artists="Bea Miller"
          />
          <SongCard
            img="https://i.scdn.co/image/ab67616d00001e028ff9ce48387873c883afa037"
            name="Arcane League of Legends (Soundtrack from the Animated Series)"
            artists="Bea Miller"
          />
          <SongCard
            img="https://i.scdn.co/image/ab67616d00001e028ff9ce48387873c883afa037"
            name="Arcane League of Legends (Soundtrack from the Animated Series)"
            artists="Bea Miller"
          />
          <SongCard
            img="https://i.scdn.co/image/ab67616d00001e028ff9ce48387873c883afa037"
            name="Arcane League of Legends (Soundtrack from the Animated Series)"
            artists="Bea Miller"
          />
          <SongCard
            img="https://i.scdn.co/image/ab67616d00001e028ff9ce48387873c883afa037"
            name="Arcane League of Legends (Soundtrack from the Animated Series)"
            artists="Bea Miller"
          />
          <SongCard
            img="https://i.scdn.co/image/ab67616d00001e028ff9ce48387873c883afa037"
            name="Arcane League of Legends (Soundtrack from the Animated Series)"
            artists="Bea Miller"
          />
          <SongCard
            img="https://i.scdn.co/image/ab67616d00001e028ff9ce48387873c883afa037"
            name="Arcane League of Legends (Soundtrack from the Animated Series)"
            artists="Bea Miller"
          />
          <SongCard
            img="https://i.scdn.co/image/ab67616d00001e028ff9ce48387873c883afa037"
            name="Arcane League of Legends (Soundtrack from the Animated Series)"
            artists="Bea Miller"
          />
          <SongCard
            img="https://i.scdn.co/image/ab67616d00001e028ff9ce48387873c883afa037"
            name="Arcane League of Legends (Soundtrack from the Animated Series)"
            artists="Bea Miller"
          />
          <SongCard
            img="https://i.scdn.co/image/ab67616d00001e028ff9ce48387873c883afa037"
            name="Arcane League of Legends (Soundtrack from the Animated Series)"
            artists="Bea Miller"
          />
          <SongCard
            img="https://i.scdn.co/image/ab67616d00001e028ff9ce48387873c883afa037"
            name="Arcane League of Legends (Soundtrack from the Animated Series)"
            artists="Bea Miller"
          />
          <SongCard
            img="https://i.scdn.co/image/ab67616d00001e028ff9ce48387873c883afa037"
            name="Arcane League of Legends (Soundtrack from the Animated Series)"
            artists="Bea Miller"
          />
          <SongCard
            img="https://i.scdn.co/image/ab67616d00001e028ff9ce48387873c883afa037"
            name="Arcane League of Legends (Soundtrack from the Animated Series)"
            artists="Bea Miller"
          />
        </List>
        <Button margin="0 auto 100px auto">GET YOUR SPECIAL PLAYLIST</Button>
      </StyledHome>
    </>
  );
};

export default Home;

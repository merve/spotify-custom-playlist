import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Text from "../components/Text";
import SongCard from "../components/SongCard";
import Button from "../components/Button";
import { size } from "../components/global-style";
import styled from "styled-components";
import SpotifyWebApi from "spotify-web-api-js";
import { useEffect, useState } from "react";
import TrackModel from "../types/track.types";

const spotify = new SpotifyWebApi();

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
  const router = useRouter();
  const [topTracks, setTopTracks] = useState<any | []>([]);
  const [selectedTracks, setSelectedTracks] = useState<any | []>([]);

  useEffect(() => {
    spotify.setAccessToken(localStorage.getItem("spotify_token") || "");
    const fetchData = async () => {
      try {
        const tracks = await spotify.getMyTopTracks();
        setTopTracks(tracks.items);
      } catch (error: any) {
        if (error.status === 401) {
          router.push("/login");
        }
      }
    };
    fetchData();
  }, [router]);

  const handleClick = (trackId: string) => {
    const index = selectedTracks.indexOf(trackId);
    if (index === -1) {
      setSelectedTracks([...selectedTracks, trackId]);
    } else {
      setSelectedTracks(selectedTracks.filter((item: any) => item !== trackId));
    }
  };

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
          {topTracks?.map((item: TrackModel) => {
            return (
              <SongCard
                selected={selectedTracks.indexOf(item.id) > -1 ? true : false}
                onClick={() => handleClick(item.id)}
                track={item}
                key={item.id}
              />
            );
          })}
        </List>
        <Button
          margin="0 auto 100px auto"
          onClick={() => {
            localStorage.setItem("selectedTracks", selectedTracks);
            router.push("/playlist");
          }}
        >
          GET YOUR SPECIAL PLAYLIST
        </Button>
      </StyledHome>
    </>
  );
};

export default Home;

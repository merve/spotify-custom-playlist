import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";
import { Svg } from "../components/icons";
import Text from "../components/Text";
import Table from "../components/Table";
import { size } from "../components/global-style";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "../components/Player";

const spotify = new SpotifyWebApi();

const StyledPlaylist = styled.div`
  color: var(--color-white);
  max-width: 1000px;
  margin: 64px auto;
  padding: 24px;
  @media ${size.maxTablet} {
    margin: 32px auto;
  }
`;
const PlaylistHeader = styled.div`
  display: flex;
  gap: 64px;
  margin: 64px 0;
  @media ${size.maxDesktop} {
    gap: 32px;
    margin: 32px 0;
  }
`;
const ActionGroup = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
`;
const IconPlay = styled.div`
  width: 56px;
  height: 56px;
  background-color: var(--color-primary);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 3px;
`;

function milToMinutesAndSeconds(mil: number) {
  let minutes = Math.floor(mil / 60000);
  let seconds = ((mil % 60000) / 1000).toFixed(0);
  return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
}
const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
function convertDate(dateString: any) {
  var date = new Date(dateString);
  return (
    monthNames[date.getMonth()] +
    " " +
    date.getDate() +
    "," +
    date.getFullYear()
  );
}

const Playlist: NextPage = () => {
  const router = useRouter();
  const [list, setList] = useState<any | []>([]);
  useEffect(() => {
    const getRecommendations = async () => {
      try {
        const recommendations = await spotify.getRecommendations({
          seed_tracks: localStorage.getItem("selectedTracks")!,
        });
        const tracks: string[] = recommendations.tracks.map((rt) => rt.id);
        const tracksResult = await spotify.getTracks(tracks);
        console.log(tracksResult.tracks);

        const formattedList = tracksResult.tracks.map((item) => ({
          id: item.track_number,
          songName: item.name,
          artist: item.artists
            .map((artist: any) => `${artist.name}`)
            .join(", "),
          album: item.album.name,
          duration: milToMinutesAndSeconds(item.duration_ms),
          img: item.album.images[0].url,
          date: convertDate((item as any).album.release_date),
        }));
        setList(formattedList);
      } catch (error: any) {
        if (error.status === 401) {
          router.push("/");
        }
      }
    };
    getRecommendations();
  }, [router]);

  return (
    <StyledPlaylist>
      <Svg type="logo" />
      <PlaylistHeader>
        <Image src="/assets/img-playlist.jpg" height={200} width={200} alt="" />
        <Text tag="h2" type="h2" color="var(--color-white)" maxWidth="320px">
          Your special playlist
        </Text>
      </PlaylistHeader>
      <ActionGroup>
        <IconPlay>
          <Svg type="icon-play" />
        </IconPlay>
        <Svg type="icon-heart" />
        <Svg type="icon-dots" />
      </ActionGroup>
      <Table list={list} />
      <Player
        token={localStorage.getItem("spotify_token")}
        uris={["spotify:artist:6HQYnRM4OzToCYPpVBInuU"]}
      />
    </StyledPlaylist>
  );
};

export default Playlist;

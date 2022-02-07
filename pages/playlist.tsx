import React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";
import { Svg } from "../components/icons";
import Text from "../components/Text";
import Table from "../components/Table";
import { size } from "../components/global-style";

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

const List = [
  {
    id: 1,
    songName: "I Like You",
    artist: "Docteur H, Yaleil",
    album: "Padre Mío",
    duration: "4:09",
    img: "https://i.scdn.co/image/ab67616d00004851973222b7d8d3453882181589",
    date: "Nov 27, 2021",
  },
  {
    id: 2,
    songName: "Playground (from the series Arcane League of Legends)",
    artist: "Bea Miller, Arcane",
    album: "Playground (from the series Arcane League of Legends)",
    duration: "3:50",
    img: "https://i.scdn.co/image/ab67616d0000485142a8ac055d1b28af6e12d2ff",
    date: "Nov 21, 2021",
  },
];

const Playlist: NextPage = () => {
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
      <Table list={List} />
    </StyledPlaylist>
  );
};

export default Playlist;

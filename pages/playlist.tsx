import React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";
import { Svg } from "../components/icons";
import Text from "../components/Text";

const StyledPlaylist = styled.div`
  color: var(--color-white);
`;

const Playlist: NextPage = () => {
  return (
    <StyledPlaylist>
      <Svg type="logo" />
      <Image src="/assets/img-playlist.jpg" height={200} width={200} alt="" />
      <Text tag="h2" type="h2" color="var(--color-white)" maxWidth="320px">
        Your special playlist
      </Text>
    </StyledPlaylist>
  );
};

export default Playlist;

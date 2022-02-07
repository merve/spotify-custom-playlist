import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Text from "../components/Text";
import { size } from "../components/global-style";
import { Svg } from "../components/icons";

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
  background-image: url("/assets/login-bg.png");
  background-size: cover;
  @media ${size.maxTablet} {
    background-image: url("/assets/login-bg-mobile.png");
  }
  @media ${size.maxMobile} {
    h1 {
      max-width: 400px;
    }
  }
`;
const LogoWrapper = styled.div`
  padding-top: 72px;
  padding-bottom: 8%;
  margin: 0;
`;

const Login: React.FC = (): JSX.Element => {
  const reqLogin = () => {
    const url = process.env.SPOTIFY_URL;
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const redirectURI = process.env.SPOTIFY_REDIRECT_URL;
    const scopes =
      "user-top-read streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state ";
    const scope = encodeURIComponent(scopes);
    const loginURL = `${url}?client_id=${clientId}&response_type=token&scope=${scope}&redirect_uri=${redirectURI}`;
    window.location.href = loginURL;
  };

  return (
    <StyledLogin>
      <LogoWrapper>
        <Svg type="logo" color="var(--color-white)" />
      </LogoWrapper>
      <Text
        tag="h1"
        type="h1"
        margin="0 auto 32px auto"
        textAlign="center"
        color="var(--color-white)"
        maxWidth="700px"
      >
        Make your own recommended list
      </Text>
      <Button margin="0 auto" onClick={() => reqLogin()}>
        LOGIN WITH SPOTIFY
      </Button>
    </StyledLogin>
  );
};
export default Login;

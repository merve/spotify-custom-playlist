import styled from "styled-components";
import SpotifyPlayer from "react-spotify-web-playback";

interface Props {
  uris: any;
  token: string | null;
}

const StyledPlayer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Player: React.FC<Props> = (props): JSX.Element => {
  const { uris, token } = props;
  return (
    <StyledPlayer>
      <SpotifyPlayer token={token} uris={uris} />;
    </StyledPlayer>
  );
};

export default Player;

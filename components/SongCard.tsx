import styled from "styled-components";
import Text from "../components/Text";
import { Svg } from "./icons";
import { size } from "../components/global-style";
import useWindowSize from "../helpers/useWindowSize";
import TrackModel from "../types/track.types";

interface SongCardProps {
  selected?: boolean;
}
export interface ITrackProps {
  track: SpotifyApi.TrackObjectFull;
  selected: boolean;
  onClick: (track: TrackModel) => void;
}

const Icon = styled.div<SongCardProps>`
  visibility: hidden;
  height: 32px;
  width: 32px;
  border-radius: 20px;
  background-color: var(--color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 135px;
  right: 18px;

  @media ${size.maxMobile} {
    visibility: visible;
    background-color: var(--color-dark);
    ${(p) => !p.selected && `border: 1px solid var(--color-white);`};
    top: 10px;
    right: 10px;
  }
`;
const Image = styled.img`
  border-radius: 2px;
  width: 100%;
`;

const Card = styled.div<SongCardProps>`
  display: flex;
  flex-direction: column;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 180px;
  position: relative;

  @media ${size.maxMobile} {
    max-width: 320px;
    padding-right: 60px;
    display: flex;
    gap: 16px;
    flex-direction: row;
    ${Image} {
      height: 56px;
      width: 56px;
    }
    & > div {
      display: grid;
    }
  }
`;

const StyledSongCard = styled.div<SongCardProps>`
  cursor: pointer;
  position: relative;
  padding: 10px;
  border-radius: 8px;
  border: 5px solid
    ${(p) => (p.selected ? `var(--color-primary)` : `var(--color-black)`)};
  background-color: var(--color-dark);
  @media ${size.maxMobile} {
    width: 100%;
  }
  input:checked + div {
    border-color: var(--color-primary);
  }
  &:hover ${Icon} {
    ${(p) => !p.selected && `visibility: visible;`};
    transition: all 0.8s;
  }
`;

export const SongCard: React.FC<ITrackProps> = (props): JSX.Element => {
  const { track } = props;
  const { width } = useWindowSize();
  const toggle = () => {
    props.onClick(props.track);
  };

  return (
    <StyledSongCard selected={props.selected} onClick={toggle}>
      <Card>
        <Image src={track.album.images[0].url} alt={track.name} />
        <div>
          <Text
            type="body"
            color="var(--color-white)"
            margin="10px 0"
            fontWeight={700}
            nowrap
          >
            {track.name}
          </Text>
          <Text type="small" color="var(--color-white)" nowrap>
            {track.artists.map((artist: any) => `${artist.name}`).join(", ")}
          </Text>
        </div>
      </Card>
      <Icon selected={props.selected}>
        {props.selected && width < 900 ? (
          <Svg type="icon-check" height={32} fill="var(--color-primary)" />
        ) : (
          <Svg type="icon-plus" height={12} />
        )}
      </Icon>
    </StyledSongCard>
  );
};

export default SongCard;

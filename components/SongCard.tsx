import styled from "styled-components";
import Text from "../components/Text";
import { Svg } from "./icons";
import { size } from "../components/global-style";
import useWindowSize from "../helpers/useWindowSize";
interface Props {
  img: string;
  name: string;
  artists: string;
  selected?: boolean;
}
const Icon = styled.div<Props>`
  visibility: hidden;
  height: 40px;
  width: 40px;
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
    border: 1px solid var(--color-white);
    top: 10px;
    right: 10px;
  }
`;
const Image = styled.img`
  border-radius: 2px;
  width: 100%;
`;

const Card = styled.div<Props>`
  display: flex;
  flex-direction: column;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 180px;
  position: relative;
  border: 5px solid
    ${(p) => (p.selected ? `var(--color-primary)` : `var(--color-black)`)};
  background-color: var(--color-dark);
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    border: 5px solid var(--color-primary);
    transition: all 0.8s;
  }
  &:hover ${Icon} {
    visibility: visible;
    transition: all 0.8s;
  }
  @media ${size.maxMobile} {
    max-width: 320px;
    padding-right: 60px;
    display: grid;
    ${Image} {
      height: 56px;
      width: 56px;
    }
    & > div {
      display: grid;
    }
  }
`;

export const SongCard: React.FC<Props> = (props): JSX.Element => {
  const { width } = useWindowSize();
  return (
    <Card {...props}>
      <Image src={props.img} alt={props.name} />
      <div>
        <Text
          type="body"
          color="var(--color-white)"
          margin="10px 0"
          fontWeight={700}
          nowrap
        >
          {props.name}
        </Text>
        <Text type="small" color="var(--color-white)" nowrap>
          {props.artists}
        </Text>
      </div>
      <Icon {...props}>
        {props.selected && width < 900 ? (
          <Svg type="icon-check" height={32} fill="var(--color-primary)" />
        ) : (
          <Svg type="icon-plus" height={12} />
        )}
      </Icon>
    </Card>
  );
};

export default SongCard;

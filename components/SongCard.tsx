import styled from "styled-components";
import Text from "../components/Text";
import { Svg } from "./icons";
import { size } from "../components/global-style";
import useWindowSize from "../helpers/useWindowSize";
import { useState } from "react";
interface Props {
  img: string;
  name: string;
  artists: string;
  selected?: boolean;
}
interface SongCardProps {
  select?: boolean;
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
    ${(p) => !p.select && `border: 1px solid var(--color-white);`};
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
const Input = styled.input`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;
const StyledSongCard = styled.div<SongCardProps>`
  position: relative;
  padding: 10px;
  border-radius: 8px;
  border: 5px solid
    ${(p) => (p.select ? `var(--color-primary)` : `var(--color-black)`)};
  background-color: var(--color-dark);

  input:checked + div {
    border-color: var(--color-primary);
  }
  &:hover ${Icon} {
    ${(p) => !p.select && `visibility: visible;`};
    transition: all 0.8s;
  }
`;

export const SongCard: React.FC<Props> = (props): JSX.Element => {
  const { width } = useWindowSize();
  const [select, setSelect] = useState(props.selected);
  return (
    <StyledSongCard select={select}>
      <Input
        type="checkbox"
        onClick={() => setSelect(!select)}
        checked={select}
      />
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
      </Card>
      <Icon {...props} select={select}>
        {select && width < 900 ? (
          <Svg type="icon-check" height={32} fill="var(--color-primary)" />
        ) : (
          <Svg type="icon-plus" height={12} />
        )}
      </Icon>
    </StyledSongCard>
  );
};

export default SongCard;

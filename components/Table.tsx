import styled from "styled-components";
import Text from "./Text";
import { Svg } from "./icons";
import { size } from "./global-style";
import Image from "next/image";
interface Props {
  list: Array<{
    id: number;
    songName: string;
    artist: string;
    album: string;
    duration: string;
    img: string;
    date: string;
  }>;
}

const StyledTable = styled.div`
  margin: 24px 0;
  color: var(--color-gray);
`;
const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 18px 6fr 4fr 3fr minmax(120px, 1fr);
  font-size: 12px;
  grid-gap: 16px;
  padding: 8px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 8px;
  & > div:last-child {
    margin-left: auto;
  }
  @media ${size.maxTablet} {
    grid-template-columns: 18px 6fr 80px;
    & > div:nth-child(3),
    & > div:nth-child(4) {
      display: none;
    }
  }
`;
const TableBody = styled.div`
  display: grid;
  gap: 10px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 18px 6fr 4fr 3fr minmax(120px, 1fr);
  grid-gap: 16px;
  align-items: center;
  padding: 8px 20px;
  border-radius: 4px;
  & div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    &:first-child > svg {
      display: none;
    }
  }
  & > div:last-child {
    text-align: right;
    display: flex;
    gap: 24px;
    align-items: center;
    justify-content: flex-end;
    @media ${size.maxTablet} {
      gap: 12px;
    }
  }
  @media ${size.maxTablet} {
    padding: 4px 10px;
    grid-gap: 8px;
    grid-template-columns: 18px 6fr 80px;
    & > div:nth-child(3),
    & > div:nth-child(4) {
      display: none;
    }
  }
  &:hover {
    transition: all 0.8s;
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
    & > div:first-child {
      p {
        display: none;
      }
      svg {
        display: inline-block;
      }
    }
  }
`;
const TableImageBlock = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 40px 1fr;
`;

export const Table: React.FC<Props> = (props): JSX.Element => {
  return (
    <StyledTable>
      <TableHeader>
        <div>#</div>
        <div>TITLE</div>
        <div>ALBUM</div>
        <div style={{ textAlign: "right" }}>DATE ADDED</div>
        <div>
          <Svg type="icon-duration" />
        </div>
      </TableHeader>
      <TableBody>
        {props.list.map((item) => (
          <TableRow key={item.id}>
            <div>
              <Svg type="icon-play" height={20} />
              <Text tag="p" type="bodySmall" color="var(--color-gray)">
                {item.id}
              </Text>
            </div>
            <TableImageBlock>
              <Image src={item.img} height={40} width={40} alt="" />
              <div>
                <Text type="body" color="var(--color-white)" margin="0 0 4px 0">
                  {item.songName}
                </Text>
                <Text type="bodySmall" color="var(--color-gray)">
                  {item.artist}
                </Text>
              </div>
            </TableImageBlock>
            <div>
              <Text type="bodySmall" color="var(--color-gray)">
                {item.album}
              </Text>
            </div>
            <div>
              <Text
                type="bodySmall"
                color="var(--color-gray)"
                textAlign="right"
              >
                {item.date}
              </Text>
            </div>
            <div>
              <Svg type="icon-heart" height={20} />
              <Text type="bodySmall" color="var(--color-gray)">
                {item.duration}
              </Text>
            </div>
          </TableRow>
        ))}
      </TableBody>
    </StyledTable>
  );
};

export default Table;

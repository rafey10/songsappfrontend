import { FC, useCallback } from "react";
import { Table } from "semantic-ui-react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  setActivePageAction,
  setSelectedSongAction,
} from "../../songs/songsSlice";
import { SongRowProps } from "./SongRow.types";

const Cell = styled(Table.Cell)`
  height: 50px;
  border: solid;
  text-align: center;
  border-color: grey;
  width: 100%;
  word-wrap: break-word;
`;

const StyledButton = styled.button`
  background-color: white;
  border: 0px;
  cursor: pointer;
  word-wrap: break-word;
  width: 100%;
`;

const SongRow: FC<SongRowProps> = ({ song }) => {
  const dispatch = useDispatch();

  const handleShowSongDetailsClick = useCallback(() => {
    dispatch(setSelectedSongAction(song));
    dispatch(setActivePageAction("showSongPage"));
  }, [dispatch, song]);

  return (
    <Table.Row>
      <Cell>
        <StyledButton onClick={handleShowSongDetailsClick}>
          {song?.song}
        </StyledButton>
      </Cell>
      <Cell>{song?.artist}</Cell>
      <Cell>{song?.album}</Cell>
      <Cell>{song?.genre}</Cell>
      <Cell>{song?.length}</Cell>
      <Cell>{song?.releaseYear}</Cell>
    </Table.Row>
  );
};

export default SongRow;

import { FC, useCallback, useState } from "react";
import { Table } from "semantic-ui-react";
import styled from "styled-components";
import SongRow from "../songRow/SongRow";
import { useDispatch, useSelector } from "react-redux";
import {
  selectActivePage,
  selectIsSearchLoading,
  selectSearchTerm,
  setActivePageAction,
} from "../../songs/songsSlice";
import _ from "lodash";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { ReactComponent as UpArrowSvg } from "../../UpArrow.svg";
import { ReactComponent as DownArrowSvg } from "../../DownArrow.svg";
import { ReactComponent as NotFoundSvg } from "../../NotFound.svg";
import { SPACINGS } from "../../styles/constants";
import { SongsTableProps } from "./SongsTable.types";

const StyledTable = styled(Table)`
  margin: 10px 20px 20px 20px;
  border-spacing: 0px;
  table-layout: fixed;
  width: 97%;
`;

const TableHeader = styled(Table.Header)`
  th {
    padding: 5px;
    color: white;
    border-color: white;
    border: 1px solid;
    width: 10%;
  }

  background-color: black;
`;

const Error = styled.p`
  text-align: center;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UpArrow = styled(UpArrowSvg)`
  width: 15px;
  height: 15px;
  margin: ${SPACINGS.xsmall}px;
`;

const DownArrow = styled(DownArrowSvg)`
  width: 15px;
  height: 15px;
  margin: ${SPACINGS.xsmall}px;
`;

const NotFoundIcon = styled(NotFoundSvg)`
  width: 40px;
  height: 40px;
`;

const ButtonsContainer = styled.div`
  margin: 0px 0px 0px ${SPACINGS.large}px;
  display: flex;
  gap: ${SPACINGS.medium}px;
`;

const SongsTable: FC<SongsTableProps> = ({ songs }) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const isSearchLoading = useSelector(selectIsSearchLoading);
  const activePage = useSelector(selectActivePage);
  const [sortByNameDescending, setSortByNameDescending] = useState(false);
  const [sortByYearDescending, setSortByYearDescending] = useState(false);
  const [sortByNameAscending, setSortByNameAscending] = useState(false);
  const [sortByYearAscending, setSortByYearAscending] = useState(false);
  const searchedSongs = songs.filter(
    (song) =>
      song.artist.toLowerCase().startsWith(searchTerm?.toLowerCase() ?? "") ||
      song.releaseYear === searchTerm
  );
  const songsDefaultSort = songs;
  const searchedSongsDefaultSort = searchedSongs;
  const songsSortedByNameAscending = _.orderBy(songs, ["song"], ["asc"]);
  const songsSortedByNameDescending = _.orderBy(songs, ["song"], ["desc"]);
  const songsSortedByYearAscending = _.orderBy(songs, ["releaseYear"], ["asc"]);
  const songsSortedByYearDescending = _.orderBy(
    songs,
    ["releaseYear"],
    ["desc"]
  );
  const searchedSongsSortedByNameAscending = _.orderBy(
    searchedSongs,
    ["song"],
    ["asc"]
  );
  const searchedSongsSortedByNameDescending = _.orderBy(
    searchedSongs,
    ["song"],
    ["desc"]
  );
  const searchedSongsSortedByYearAscending = _.orderBy(
    searchedSongs,
    ["releaseYear"],
    ["asc"]
  );
  const searchedSongsSortedByYearDescending = _.orderBy(
    searchedSongs,
    ["releaseYear"],
    ["desc"]
  );

  const handleSortByNameAscendingClick = useCallback(() => {
    if (sortByNameAscending) {
      setSortByNameAscending(false);
    } else {
      setSortByNameDescending(false);
      setSortByYearAscending(false);
      setSortByYearDescending(false);
      setSortByNameAscending(true);
    }
  }, [sortByNameAscending]);

  const handleSortByNameDescendingClick = useCallback(() => {
    if (sortByNameDescending) {
      setSortByNameDescending(false);
    } else {
      setSortByYearAscending(false);
      setSortByYearDescending(false);
      setSortByNameAscending(false);
      setSortByNameDescending(true);
    }
  }, [sortByNameDescending]);

  const handleSortByYearAscendingClick = useCallback(() => {
    if (sortByYearAscending) {
      setSortByYearAscending(false);
    } else {
      setSortByYearDescending(false);
      setSortByNameAscending(false);
      setSortByNameDescending(false);
      setSortByYearAscending(true);
    }
  }, [sortByYearAscending]);

  const handleSortByYearDescendingClick = useCallback(() => {
    if (sortByYearDescending) {
      setSortByYearDescending(false);
    } else {
      setSortByNameAscending(false);
      setSortByNameDescending(false);
      setSortByYearAscending(false);
      setSortByYearDescending(true);
    }
  }, [sortByYearDescending]);

  const handleSubmit = useCallback(() => {
    dispatch(setActivePageAction("submitSongPage"));
  }, [dispatch]);

  return (
    <>
      {((searchTerm && _.isEmpty(searchedSongs)) ||
        (!searchTerm && _.isEmpty(songs))) &&
      !isSearchLoading ? (
        <Error>
          <NotFoundIcon /> No Songs Found
        </Error>
      ) : (
        <>
          {activePage !== "showSongPage" && (
            <ButtonsContainer>
              <ToggleButtonGroup
                orientation="vertical"
                color="primary"
                size="small"
              >
                <ToggleButton
                  value={""}
                  selected={sortByNameAscending}
                  onClick={handleSortByNameAscendingClick}
                >
                  Sort by Name <UpArrow />
                </ToggleButton>
                <ToggleButton
                  value={""}
                  selected={sortByNameDescending}
                  onClick={handleSortByNameDescendingClick}
                >
                  Sort by Name <DownArrow />
                </ToggleButton>
              </ToggleButtonGroup>
              <ToggleButtonGroup
                orientation="vertical"
                color="primary"
                size="small"
              >
                <ToggleButton
                  value={""}
                  selected={sortByYearAscending}
                  onClick={handleSortByYearAscendingClick}
                >
                  Sort by Year <UpArrow />
                </ToggleButton>
                <ToggleButton
                  value={""}
                  selected={sortByYearDescending}
                  onClick={handleSortByYearDescendingClick}
                >
                  Sort by Year <DownArrow />
                </ToggleButton>
              </ToggleButtonGroup>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleSubmit}
                >
                  + Add Song
                </Button>
            </ButtonsContainer>
          )}
          <StyledTable selectable>
            <TableHeader>
              <Table.Row>
                <Table.HeaderCell>Song</Table.HeaderCell>
                <Table.HeaderCell>Artist</Table.HeaderCell>
                <Table.HeaderCell>Album</Table.HeaderCell>
                <Table.HeaderCell>Genre</Table.HeaderCell>
                <Table.HeaderCell>Length</Table.HeaderCell>
                <Table.HeaderCell>Year</Table.HeaderCell>
              </Table.Row>
            </TableHeader>
            <Table.Body>
              {searchTerm &&
                !sortByNameAscending &&
                !sortByNameDescending &&
                !sortByYearAscending &&
                !sortByYearDescending &&
                searchedSongsDefaultSort.map((searchedSong) => (
                  <SongRow song={searchedSong}></SongRow>
                ))}
              {searchTerm &&
                sortByNameAscending &&
                !sortByNameDescending &&
                !sortByYearAscending &&
                !sortByYearDescending &&
                searchedSongsSortedByNameAscending.map((searchedSong) => (
                  <SongRow song={searchedSong}></SongRow>
                ))}
              {searchTerm &&
                !sortByNameAscending &&
                sortByNameDescending &&
                !sortByYearAscending &&
                !sortByYearDescending &&
                searchedSongsSortedByNameDescending.map((searchedSong) => (
                  <SongRow song={searchedSong}></SongRow>
                ))}
              {searchTerm &&
                !sortByNameAscending &&
                !sortByNameDescending &&
                sortByYearAscending &&
                !sortByYearDescending &&
                searchedSongsSortedByYearAscending.map((searchedSong) => (
                  <SongRow song={searchedSong}></SongRow>
                ))}
              {searchTerm &&
                !sortByNameAscending &&
                !sortByNameDescending &&
                !sortByYearAscending &&
                sortByYearDescending &&
                searchedSongsSortedByYearDescending.map((searchedSong) => (
                  <SongRow song={searchedSong}></SongRow>
                ))}

              {!searchTerm &&
                !sortByNameAscending &&
                !sortByNameDescending &&
                !sortByYearAscending &&
                !sortByYearDescending &&
                songsDefaultSort.map((song) => <SongRow song={song}></SongRow>)}
              {!searchTerm &&
                sortByNameAscending &&
                !sortByNameDescending &&
                !sortByYearAscending &&
                !sortByYearDescending &&
                songsSortedByNameAscending.map((song) => (
                  <SongRow song={song}></SongRow>
                ))}
              {!searchTerm &&
                !sortByNameAscending &&
                sortByNameDescending &&
                !sortByYearAscending &&
                !sortByYearDescending &&
                songsSortedByNameDescending.map((song) => (
                  <SongRow song={song}></SongRow>
                ))}
              {!searchTerm &&
                !sortByNameAscending &&
                !sortByNameDescending &&
                sortByYearAscending &&
                !sortByYearDescending &&
                songsSortedByYearAscending.map((song) => (
                  <SongRow song={song}></SongRow>
                ))}
              {!searchTerm &&
                !sortByNameAscending &&
                !sortByNameDescending &&
                !sortByYearAscending &&
                sortByYearDescending &&
                songsSortedByYearDescending.map((song) => (
                  <SongRow song={song}></SongRow>
                ))}
            </Table.Body>
          </StyledTable>
        </>
      )}
    </>
  );
};

export default SongsTable;

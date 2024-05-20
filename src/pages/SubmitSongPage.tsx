import React, { FC, useCallback, useState } from "react";
import ContentWrapper from "../styles/ContentWrapper";
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectSongs, setActivePageAction } from "../songs/songsSlice";
import {
  fetchAvailableSongsAction,
  submitSongAction,
} from "../songs/songs.actions";
import { SubmitSongParams } from "../songs/songs.types";

const FlexWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ButtonContainer = styled.div`
  text-align: right;
  margin-top: 20px;
`;

const Heading = styled.h2`
  margin: 0px 0px 0px 20px;
  text-align: center;
`;

const SubmitSongPage: FC = () => {
  const dispatch = useDispatch();
  const addedSongs = useSelector(selectSongs);
  const [songName, setSongName] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [songAlbum, setSongAlbum] = useState("");
  const [songGenre, setSongGenre] = useState("");
  const [songLength, setSongLength] = useState("");
  const [songYear, setSongYear] = useState("");
  const handleSongNameInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSongName(event.target.value);
    },
    []
  );
  const handleSongAlbumInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSongAlbum(event.target.value);
    },
    []
  );
  const handleSongArtistInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSongArtist(event.target.value);
    },
    []
  );
  const handleSongLengthInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSongLength(event.target.value);
    },
    []
  );
  const handleSongGenreInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSongGenre(event.target.value);
    },
    []
  );
  const handleSongYearInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSongYear(event.target.value);
    },
    []
  );
  const isSongNameError = addedSongs
    .filter((song) => song.song === songName)
    .at(0)
    ? true
    : false;

  const isFormStateValid =
    !isSongNameError &&
    songArtist !== "" &&
    songAlbum !== "" &&
    songGenre !== "" &&
    songLength !== "" &&
    songYear !== "";

  const handleSongSubmitClick = useCallback(() => {
    const song: SubmitSongParams = {
      song: songName,
      album: songAlbum,
      artist: songArtist,
      genre: songGenre,
      length: songLength,
      releaseYear: songYear,
    };
    dispatch(submitSongAction(song));
    dispatch(fetchAvailableSongsAction());
    dispatch(setActivePageAction("entryPage"));
  }, [
    dispatch,
    songName,
    songAlbum,
    songArtist,
    songGenre,
    songLength,
    songYear,
  ]);

  return (
    <ContentWrapper>
      <FlexWrap>
        <Heading>Submit your Song</Heading>
        <p>Add details about your song here</p>
        <TextField
          id="outlined-basic"
          label="Song Name"
          variant="outlined"
          required
          helperText="Song must not already be added"
          error={isSongNameError}
          onChange={handleSongNameInput}
        />
        <TextField
          id="outlined-basic"
          label="Artist"
          variant="outlined"
          required
          onChange={handleSongArtistInput}
        />
        <TextField
          id="outlined-basic"
          label="Album"
          variant="outlined"
          required
          onChange={handleSongAlbumInput}
        />
        <TextField
          id="outlined-basic"
          label="Genre"
          variant="outlined"
          required
          onChange={handleSongGenreInput}
        />
        <TextField
          id="outlined-basic"
          label="Length"
          variant="outlined"
          required
          helperText="Length must be input in the HH:MM:SS format e.g. 00:02:30"
          onChange={handleSongLengthInput}
        />
        <TextField
          id="outlined-basic"
          label="Year"
          variant="outlined"
          required
          helperText="Year Input must be a 4 digit number e.g. 2019"
          onChange={handleSongYearInput}
        />
        <ButtonContainer>
          <Button
            variant="contained"
            color="inherit"
            size="large"
            onClick={handleSongSubmitClick}
            disabled={!isFormStateValid}
          >
            + Add Song
          </Button>
        </ButtonContainer>
      </FlexWrap>
    </ContentWrapper>
  );
};

export default SubmitSongPage;

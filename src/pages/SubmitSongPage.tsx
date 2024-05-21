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
  display: flex;
  gap: 10px;
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
  const [songAdded, setSongAdded] = useState(false);

  const handleSongNameInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSongName(event.target.value.trim());
    },
    []
  );
  const handleSongAlbumInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSongAlbum(event.target.value.trim());
    },
    []
  );
  const handleSongArtistInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSongArtist(event.target.value.trim());
    },
    []
  );
  const handleSongLengthInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSongLength(event.target.value.trim());
    },
    []
  );
  const handleSongGenreInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSongGenre(event.target.value.trim());
    },
    []
  );
  const handleSongYearInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSongYear(event.target.value.trim());
    },
    []
  );

  const isTextEntryInvalid = function (entry: string) {
    return entry.length > 200 || !/^[a-zA-Z]+$/.test(entry);
  };

  const isSongLengthInvalid = function (entry: string) {
    return !/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(entry);
  };

  const isSongYearInvalid = function (entry: string) {
    return (
      !/^\d+$/.test(entry) || parseInt(entry) > 2024 || parseInt(entry) < 1800
    );
  };

  const isSongNameAlreadyAdded = addedSongs
    .filter((song) => song.song === songName)
    .at(0)
    ? true
    : false;

  const isSongNameError =
    isSongNameAlreadyAdded ||
    isTextEntryInvalid(songName.trim().replace(/\s+/g, ""));

  const isFormStateValid =
    !isSongNameError &&
    !isTextEntryInvalid(songArtist.trim().replace(/\s+/g, "")) &&
    !isTextEntryInvalid(songAlbum.trim().replace(/\s+/g, "")) &&
    !isTextEntryInvalid(songGenre.trim().replace(/\s+/g, "")) &&
    !isSongLengthInvalid(songLength.trim().replace(/\s+/g, "")) &&
    !isSongYearInvalid(songYear.trim().replace(/\s+/g, ""));

  const handleGoBackClick = useCallback(() => {
    setSongAdded(false);
    dispatch(setActivePageAction("entryPage"));
  }, [dispatch]);

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
    setSongAdded(true);
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
          helperText={
            songName !== "" && isSongNameError
              ? "Song must not already be added. Maximum 200 characters [a-z, A-Z]."
              : null
          }
          error={songName === "" ? false : isSongNameError}
          onChange={handleSongNameInput}
        />
        <TextField
          id="outlined-basic"
          label="Artist"
          variant="outlined"
          required
          helperText={
            songArtist !== "" &&
            isTextEntryInvalid(songArtist.trim().replace(/\s+/g, ""))
              ? "Maximum 200 characters [a-z, A-Z]."
              : null
          }
          onChange={handleSongArtistInput}
          error={
            songArtist === ""
              ? false
              : isTextEntryInvalid(songArtist.trim().replace(/\s+/g, ""))
          }
        />
        <TextField
          id="outlined-basic"
          label="Album"
          variant="outlined"
          required
          helperText={
            songAlbum !== "" &&
            isTextEntryInvalid(songAlbum.trim().replace(/\s+/g, ""))
              ? "Maximum 200 characters [a-z, A-Z]."
              : null
          }
          onChange={handleSongAlbumInput}
          error={
            songAlbum === ""
              ? false
              : isTextEntryInvalid(songAlbum.trim().replace(/\s+/g, ""))
          }
        />
        <TextField
          id="outlined-basic"
          label="Genre"
          variant="outlined"
          required
          helperText={
            songGenre !== "" &&
            isTextEntryInvalid(songGenre.trim().replace(/\s+/g, ""))
              ? "Maximum 200 characters [a-z, A-Z]."
              : null
          }
          onChange={handleSongGenreInput}
          error={
            songGenre === ""
              ? false
              : isTextEntryInvalid(songGenre.trim().replace(/\s+/g, ""))
          }
        />
        <TextField
          id="outlined-basic"
          label="Length"
          variant="outlined"
          required
          helperText="Must be input in HH:MM:SS format e.g. 00:02:30"
          onChange={handleSongLengthInput}
          error={
            songLength === ""
              ? false
              : isSongLengthInvalid(songLength.trim().replace(/\s+/g, ""))
          }
        />
        <TextField
          id="outlined-basic"
          label="Year"
          variant="outlined"
          required
          helperText="Input must be a valid year"
          onChange={handleSongYearInput}
          error={
            songYear === ""
              ? false
              : isSongYearInvalid(songYear.trim().replace(/\s+/g, ""))
          }
        />
        <ButtonContainer>
          <Button
            variant="contained"
            color="inherit"
            size="large"
            onClick={handleGoBackClick}
          >
            Go Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSongSubmitClick}
            disabled={!isFormStateValid}
          >
            {songAdded ? "+ Add Another Song" : "+ Add Song"}
          </Button>
        </ButtonContainer>
      </FlexWrap>
    </ContentWrapper>
  );
};

export default SubmitSongPage;

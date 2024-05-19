import { createAction } from "@reduxjs/toolkit";
import { SubmitSongParams } from "./songs.types";

export const fetchAvailableSongsAction = createAction(
  `songs/fetchAvailableSongs`
);

export const submitSongAction = createAction<SubmitSongParams>(`songs/submitSong`);

export const setSubmitSongParamsAction = createAction(`songs/setSubmitSongParams`);
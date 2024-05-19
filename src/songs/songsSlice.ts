import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SongsSliceInitialState } from "./songs.types";

const initialState: SongsSliceInitialState = {
  songs: [],
  addedSong: undefined,
};

export const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: (create) => ({
    fetchAvailableSongsDoneAction: create.reducer(
      (state, action: PayloadAction<SongsSliceInitialState["songs"]>) => {
        state.songs = action.payload;
      }
    ),
    setAddedSongAction: create.reducer(
      (state, action: PayloadAction<SongsSliceInitialState["addedSong"]>) => {
        state.addedSong = action.payload;
      }
    ),
  }),
  selectors: {
    selectSongs: ({ songs }) => songs || [],
  },
});

export const { fetchAvailableSongsDoneAction, setAddedSongAction } =
  songsSlice.actions;

export const { selectSongs } = songsSlice.selectors;

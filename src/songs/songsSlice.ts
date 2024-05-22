import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SongsSliceInitialState } from "./songs.types";

const initialState: SongsSliceInitialState = {
  songs: [],
  addedSong: undefined,
  searchTerm: undefined,
  isSearchLoading: false,
  activePage: "entryPage",
  selectedSong: undefined,
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
    setSearchTermAction: create.reducer(
      (state, action: PayloadAction<SongsSliceInitialState["searchTerm"]>) => {
        state.isSearchLoading = true;
        state.searchTerm = action.payload;
      }
    ),
    setIsSearchLoadingAction: create.reducer(
      (
        state,
        action: PayloadAction<SongsSliceInitialState["isSearchLoading"]>
      ) => {
        state.isSearchLoading = action.payload;
      }
    ),
    setActivePageAction: create.reducer(
      (state, action: PayloadAction<SongsSliceInitialState["activePage"]>) => {
        state.activePage = action.payload;
      }
    ),
    setSelectedSongAction: create.reducer(
      (
        state,
        action: PayloadAction<SongsSliceInitialState["selectedSong"]>
      ) => {
        state.selectedSong = action.payload;
      }
    ),
  }),
  selectors: {
    selectSongs: ({ songs }) => songs || [],
    selectSearchTerm: ({ searchTerm }) => searchTerm,
    selectIsSearchLoading: ({ isSearchLoading }) => isSearchLoading || false,
    selectActivePage: ({ activePage }) => activePage,
    selectSelectedSong: ({ selectedSong }) => selectedSong,
  },
});

export const {
  fetchAvailableSongsDoneAction,
  setAddedSongAction,
  setSearchTermAction,
  setIsSearchLoadingAction,
  setActivePageAction,
  setSelectedSongAction,
} = songsSlice.actions;

export const {
  selectSongs,
  selectSearchTerm,
  selectIsSearchLoading,
  selectActivePage,
  selectSelectedSong,
} = songsSlice.selectors;

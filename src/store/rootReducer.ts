import { combineSlices } from "@reduxjs/toolkit";
import { combineEpics } from "redux-observable";
import { songsEpic } from "../songs/songs.epics";
import { songsSlice } from "../songs/songsSlice";

export const rootEpic = combineEpics(songsEpic);

/**
 * `combineSlices` combines the reducers using
 *  their reducerPath(s), no need to call `combineReducers`.
 *  */
export const rootReducer = combineSlices(songsSlice);

import { Selector } from "reselect";
import SongsService from "./songs.service";
import { RootState } from "../store/store.types";

export interface SongsDependencies{
    songsService: SongsService;
}

export interface Song {
    id: string 
    song: string,
  	artist: string,
    album: string,
   	releaseYear: string,
    length: string,
	genre : string  
}

export interface SubmitSongParams {
    song: string,
  	artist: string,
    album: string,
   	releaseYear: string,
    length: string,
	genre : string  
}

export type SongsSliceInitialState = {
    songs: Array<Song>
    addedSong?: Song
};

export type SongsSelector<R> = Selector<RootState, R>;
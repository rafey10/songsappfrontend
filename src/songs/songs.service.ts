import ApiService from "../api/ApiService";
import { Observable as RxJsObservable } from "rxjs";
import { Song, SubmitSongParams } from "./songs.types";

export default class SongsService {
  private api: ApiService;

  constructor(api: ApiService) {
    this.api = api;
  }

  /**
   * Gets the list of stored songs.
   */
  getSongs(): RxJsObservable<Array<Song>> {
    return this.api.get("/get-songs");
  }

  /**
   * Adds a song to the catalogue.
   */
  addSong(params: SubmitSongParams): RxJsObservable<Song> {
    return this.api.post("/add-song", { data: params });
  }
}

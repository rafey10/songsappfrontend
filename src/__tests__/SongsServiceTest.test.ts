import ApiService from "../api/ApiService";
import { RunHelpers, TestScheduler } from "rxjs/internal/testing/TestScheduler";
import SongsService from "../songs/songs.service";
import { Song, SubmitSongParams } from "../songs/songs.types";
import assert from "assert";
import { padStart } from "lodash";

jest.mock("../api/ApiService.ts");

describe("SongsService", () => {
  describe("call to add a song", () => {
    const requestValues = {
      r: {
        id: "1",
        song: "AddedSong",
        artist: "AddedArtist",
        album: "AddedAlbum",
        releaseYear: "2019",
        length: "00:02:30",
        genre: "AddedGenre",
      },
    };
    const expectedResult = {
      id: "1",
      song: "AddedSong",
      artist: "AddedArtist",
      album: "AddedAlbum",
      releaseYear: "2019",
      length: "00:02:30",
      genre: "AddedGenre",
    };

    it("succeeds if the paramters are entered correctly", () => {
      newTestScheduler().run(({ cold, expectObservable }) => {
        const mockSubmitSongParams = {
          song: "AddedSong",
          artist: "AddedArtist",
          album: "AddedAlbum",
          releaseYear: "2019",
          length: "00:02:30",
          genre: "AddedGenre",
        };
        const apiService = mockApiService(cold, "(r|)", requestValues, {});
        const songsService = new SongsService(apiService);
        const response$ = songsService.addSong(mockSubmitSongParams);
        expectObservable(response$).toBe("(r|)", {
          r: expectedResult,
        });
      });
    });

    it("fails when a parameter is incorrect", () => {
      newTestScheduler().run(({ cold, expectObservable }) => {
        const mockSubmitSongParams = {
          song: "AddedSong",
          artist: "AddedArtist",
          album: "AddedAlbum",
          releaseYear: "2019",
          length: "3min",
          genre: "AddedGenre",
        };
        const error = { failureReason: "INTERNAL_SERVER_ERROR" };
        const apiService = mockApiService(cold, "-#", {}, error);
        const songsService = new SongsService(apiService);
        const response$ = songsService.addSong(mockSubmitSongParams);
        expectObservable(response$).toBe("-#", {}, error);
      });
    });
  });

  describe("call to get available songs", () => {
    it("calls the /get-songs API endpoint to get a list of available songs", () => {
      newTestScheduler().run(({ cold, expectObservable }) => {
        const mockSongs = [
          {
            id: "1",
            song: "NewSong",
            artist: "NewArtist",
            album: "NewAlbum",
            releaseYear: "2019",
            length: "00:02:30",
            genre: "NewGenre",
          },
        ];
        const requestValues = {
          r: mockSongs,
        };
        const error = { response: { status: 500 } };
        const apiService = mockApiService(cold, "-(r|)", requestValues, error);
        const songsService = new SongsService(apiService);
        const response$ = songsService.getSongs();
        expectObservable(response$).toBe("-(r|)", {
          r: mockSongs,
          error,
        });
      });
    });
    it("fails if the server is not available", () => {
      newTestScheduler().run(({ cold, expectObservable }) => {
        const error = { failureReason: "INTERNAL_SERVER_ERROR" };
        const apiService = mockApiService(cold, "-#", {}, error);
        const songsService = new SongsService(apiService);
        const response$ = songsService.getSongs();
        expectObservable(response$).toBe("-#", {}, error);
      });
    });
  });

  function mockApiService(
    cold: RunHelpers["cold"],
    responseMarble: string,
    requestValues: Record<string, Array<Song> | SubmitSongParams>,
    error?: any
  ) {
    const mockedApiService = new ApiService();
    mockedApiService.get = jest
      .fn()
      .mockImplementation(() => cold(responseMarble, requestValues, error));
    mockedApiService.post = jest
      .fn()
      .mockImplementation(() => cold(responseMarble, requestValues, error));
    return mockedApiService;
  }

  /*
   * creates an RxJs TestScheduler which is configured for Jest to 
   * simplify redux observable epic tests. Provides a compactly formatted 
   * error message which makes debugging easier.
   */
  function newTestScheduler(): TestScheduler {
    return new TestScheduler(deepEqualWithFormattedError);
  }

  function deepEqualWithFormattedError(actual: any, expected: any) {
    assert.deepStrictEqual(
      actual,
      expected,
      `
  
  Got:
  ${formatFrames(actual)}
  
  Expected:
  ${formatFrames(expected)}
      `
    );

    function formatFrames(frames: any[]) {
      return frames
        .map((f) => {
          const frameString = padStart(f.frame, 5);
          const notificationString = JSON.stringify(f.notification);
          return `Frame ${frameString} ${notificationString}\n`;
        })
        .join("");
    }
  }
});

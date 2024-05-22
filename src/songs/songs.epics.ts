import { combineEpics } from "redux-observable";
import { AppEpic, RootState } from "../store/store.types";
import { catchError, filter, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { fetchAvailableSongsAction, submitSongAction } from "./songs.actions";
import {
  fetchAvailableSongsDoneAction,
  setAddedSongAction,
} from "./songsSlice";
// import { getFailureReason } from "../api/errors";
// import { showToastAction } from "../components/toast/toastSlice";

// const showErrorToaster = (msg: string | undefined) => {
//   return showToastAction({
//     type: "error",
//     text: msg ?? "Request Failed",
//   });
// };

function showErrorToast(error: any, state: RootState) {
  console.log(error);
  console.log(state);
  return of();
}

export const fetchAvailableSongsEpic: AppEpic = (
  action$,
  state$,
  { songsService }
) =>
  action$.pipe(
    filter(fetchAvailableSongsAction.match),
    switchMap(() =>
      songsService.getSongs().pipe(
        map((songs) => fetchAvailableSongsDoneAction(songs)),
        catchError((error) => showErrorToast(error, state$.value))
      )
    )
  );

export const submitSongEpic: AppEpic = (action$, state$, { songsService }) =>
  action$.pipe(
    filter(submitSongAction.match),
    switchMap(({ payload }) => {
      return songsService.addSong(payload).pipe(
        map((addedSong) => setAddedSongAction(addedSong)),
        catchError((error) => showErrorToast(error, state$.value))
      );
    })
  );

export const songsEpic = combineEpics(fetchAvailableSongsEpic, submitSongEpic);

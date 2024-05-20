import { AppEpic } from "../../store/store.types";
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { filter, of } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { ToastMessage } from "./toast.types";

export type ToastSliceInitialState = {
    toast?: ToastMessage;
  };

  export type ShowToastMessagePayload = ToastMessage;

const initialState: ToastSliceInitialState = {
    toast: undefined,
};

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: create => ({
      showToastAction: create.reducer(
        (state, action: PayloadAction<ShowToastMessagePayload>) => {
          state.toast = action.payload;
        }
      ),
      dismissToastAction: create.reducer(state => {
        state.toast = undefined;
      }),
    }),
    selectors: {
      selectToastMessage: state => state.toast,
    },
  });
  
  export const { dismissToastAction, showToastAction } = toastSlice.actions;
  
  export const { selectToastMessage } = toastSlice.selectors;
  
  export const toastEpic: AppEpic = (action$, state$) => {
    const toastDurationMs = 6000;
    return action$.pipe(
      filter(showToastAction.match),
      debounceTime(toastDurationMs),
      switchMap(({ payload }) => {
        return of(dismissToastAction()).pipe(
          takeUntil(action$.pipe(filter(dismissToastAction.match)))
        );
      })
    );
  };
  
  
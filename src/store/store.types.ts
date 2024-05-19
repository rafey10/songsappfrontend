// export type Dependencies = AuthDependencies &
//   LayoutDependencies &
//   CompanyDependencies &
//   DealsUserAccountDependencies &
//   AssetsDependencies &
//   UserAccountDependencies &
//   ClaimsDependencies;
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { Action as ReduxAction } from "redux";
import { rootReducer } from "./rootReducer";
import { makeStore } from "./store";
import { SongsDependencies } from "../songs/songs.types";
import { Epic } from "redux-observable";

export type Dependencies = SongsDependencies;

export type AppEpic = Epic<ReduxAction, ReduxAction, RootState, Dependencies>;

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `AppState` type from the store itself
export type AppState = AppStore["getState"];

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;

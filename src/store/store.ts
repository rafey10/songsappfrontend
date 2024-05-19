import { createEpicMiddleware } from "redux-observable";
import { AppDispatch, Dependencies, RootState } from "./store.types";
import { Action as ReduxAction } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootEpic, rootReducer } from "./rootReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ApiService from "../api/ApiService";
import SongsService from "../songs/songs.service";

const apiService = new ApiService();
const songsService = new SongsService(apiService);
export const dependencies: Dependencies = {
  songsService,
};

export const makeStore = () => {
  const epicMiddleware = createEpicMiddleware<
    ReduxAction,
    ReduxAction,
    RootState,
    Dependencies
  >({ dependencies });

  const store = configureStore({
    devTools: true,
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({ serializableCheck: false }).concat(
        epicMiddleware
      );
    },
  });

  epicMiddleware.run(rootEpic);

  return store;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

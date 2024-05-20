import { FC } from "react";
import { useSelector } from "react-redux";
import { selectActivePage } from "./songsSlice";
import SongsPage from "../pages/ViewSongsPage";
import { Route, Routes } from "react-router-dom";
import SubmitSongPage from "../pages/SubmitSongPage";
import ShowSongDetailsPage from "../pages/ShowSongDetailsPage";

const ReduxFlow: FC = () => {
  const activePage = useSelector(selectActivePage);
  return (
    <>
      {activePage === "entryPage" && <SongsPage />}
      {activePage === "submitSongPage" && <SubmitSongPage />}
      {activePage === "showSongPage" && <ShowSongDetailsPage />}
    </>
  );
};

const SongsFlow: FC = () => {
  return (
    <Routes>
      <Route index path="/" element={<ReduxFlow />} />
    </Routes>
  );
};

export default SongsFlow;

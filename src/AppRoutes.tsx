import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import SongsFlow from "./songs/SongsFlow";

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"*"} element={<SongsFlow />} />
    </Routes>
  );
};

export default AppRoutes;

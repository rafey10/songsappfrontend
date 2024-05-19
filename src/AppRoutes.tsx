import { FC } from "react";
import { Route, Routes } from "react-router-dom";

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route index path="//songs" element={<>Songs Flow</>}></Route>
      <Route path={'*'} element={<>* flow</>} />
    </Routes>
  );
};

export default AppRoutes;

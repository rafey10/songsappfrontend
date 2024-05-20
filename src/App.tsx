import React, { FC } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./store/StoreProvider";
import AppLayout from "./components/AppLayout/AppLayout";
import AppRoutes from "./AppRoutes";
import GlobalStyle from "./styles/GlobalStyle";

const App: FC= () => {
  // useEffect(() => {
  //   axios
  //     .post(
  //       "https://b25hr3zed5.execute-api.eu-north-1.amazonaws.com/songsappdeploymentstage/add-song",
  //       // "http://localhost:8080/add-song",
  //       {
  //         song: "NewestSong",
  //         artist: "NewArtist",
  //         album: "NewArtist",
  //         releaseYear: "2019",
  //         length: "11:08:59",
  //         genre: "NewGenre",
  //       }
  //     )
  //     .then((response) => console.log(response))
  //     .catch((error) => console.log(error));
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://b25hr3zed5.execute-api.eu-north-1.amazonaws.com/songsappdeploymentstage/get-songs"
  //       // "http://localhost:8080/get-songs"
  //     )
  //     .then((response) => console.log(response))
  //     .catch((error) => console.log(error));
  // }, []);

  return (
    <BrowserRouter basename={""}>
      <StoreProvider>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </StoreProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;

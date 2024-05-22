import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./store/StoreProvider";
import AppLayout from "./components/AppLayout";
import AppRoutes from "./AppRoutes";
import GlobalStyle from "./shared/GlobalStyle";
// import axios from "axios";
// import { useEffectOnce } from "usehooks-ts";

const App: FC = () => {
  /**
   * Inject Table with dummy Data on Startup
   */
  // useEffectOnce(() => {
  //   axios
  //     .post(
  //       "https://b25hr3zed5.execute-api.eu-north-1.amazonaws.com/songsappdeploymentstage/add-song",
  //       // "http://localhost:8080/add-song",
  //       {
  //         song: "AAAAAAAA",
  //         artist: "AAAAAAAA",
  //         album: "AAAAAAAAA",
  //         releaseYear: "1900",
  //         length: "11:08:59",
  //         genre: "AAAAAAAAA",
  //       }
  //     )
  //     .then((response) => console.log(response))
  //     .catch((error) => console.log(error));
  //   axios
  //     .post(
  //       "https://b25hr3zed5.execute-api.eu-north-1.amazonaws.com/songsappdeploymentstage/add-song",
  //       // "http://localhost:8080/add-song",
  //       {
  //         song: "BBBBBBBBB",
  //         artist: "BBBBBBBBB",
  //         album: "BBBBBBBBB",
  //         releaseYear: "2019",
  //         length: "11:08:59",
  //         genre: "BBBBBBBBB",
  //       }
  //     )
  //     .then((response) => console.log(response))
  //     .catch((error) => console.log(error));
  //   axios
  //     .post(
  //       "https://b25hr3zed5.execute-api.eu-north-1.amazonaws.com/songsappdeploymentstage/add-song",
  //       // "http://localhost:8080/add-song",
  //       {
  //         song: "CCCCCCCCCC CCCCCCCCCC CCCCCCCCCCC CCCCCCCCCC CCCCCCCCCC CCCCCCCCCC CCCCCCCCCC",
  //         artist: "CCCCCCCCCC",
  //         album: "CCCCCCCCCC",
  //         releaseYear: "2024",
  //         length: "11:08:59",
  //         genre: "CCCCCCCCCC",
  //       }
  //     )
  //     .then((response) => console.log(response))
  //     .catch((error) => console.log(error));
  //   axios
  //     .post(
  //       "https://b25hr3zed5.execute-api.eu-north-1.amazonaws.com/songsappdeploymentstage/add-song",
  //       // "http://localhost:8080/add-song",
  //       {
  //         song: "DDDDDDDDD",
  //         artist: "DDDDDDDDD",
  //         album: "DDDDDDDDD",
  //         releaseYear: "2020",
  //         length: "11:08:59",
  //         genre: "DDDDDDDDD",
  //       }
  //     )
  //     .then((response) => console.log(response))
  //     .catch((error) => console.log(error));
  //   axios
  //     .post(
  //       "https://b25hr3zed5.execute-api.eu-north-1.amazonaws.com/songsappdeploymentstage/add-song",
  //       // "http://localhost:8080/add-song",
  //       {
  //         song: "EEEEEEEEE",
  //         artist: "EEEEEEEEE",
  //         album: "EEEEEEEEE",
  //         releaseYear: "2021",
  //         length: "11:08:59",
  //         genre: "EEEEEEEEE",
  //       }
  //     )
  //     .then((response) => console.log(response))
  //     .catch((error) => console.log(error));
  //   axios
  //     .post(
  //       "https://b25hr3zed5.execute-api.eu-north-1.amazonaws.com/songsappdeploymentstage/add-song",
  //       // "http://localhost:8080/add-song",
  //       {
  //         song: "FFFFFFFFF",
  //         artist: "FFFFFFFFF",
  //         album: "FFFFFFFFF",
  //         releaseYear: "2019",
  //         length: "11:08:59",
  //         genre: "FFFFFFFFF",
  //       }
  //     )
  //     .then((response) => console.log(response))
  //     .catch((error) => console.log(error));
  // });

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
};

export default App;

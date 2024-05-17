import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  useEffect(() => {
    axios
      .post("https://b25hr3zed5.execute-api.eu-north-1.amazonaws.com/songsappdeploymentstage/add-song", {
        song: "NewArtist",
        artist: "NewArtist",
        album: "NewArtist",
        releaseYear: "2019",
        length: "11:08:59",
        genre: "NewGenre",
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://b25hr3zed5.execute-api.eu-north-1.amazonaws.com/songsappdeploymentstage/get-songs"
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {/* <p>{apiResponse}</p>
        <p>{apiResponse2}</p> */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [apiResponse, setApiResponse] = useState(String);

  useEffect(() => {
    axios
      .get(
        "https://b25hr3zed5.execute-api.eu-north-1.amazonaws.com/songsappdeploymentstage/hello-world",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }
      )
      .then((response) => setApiResponse(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>{apiResponse}</p>
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

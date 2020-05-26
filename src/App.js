import React from "react";
import {Router} from "@reach/router";
// COMPONENTS
import Home from "./components/Home.js";
import Movie from "./components/Movie.js";

const App = () => (
    <>
      <Router>
        <Home path="/"/>
        <Movie path="/:movieId"/>
      </Router>
    </>
);

export default App;
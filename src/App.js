import React from "react";
import {store} from "./redux/store";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "./components/HomePage.js";
import MoviePage from "./components/MoviePage.js";
import TvPage from "./components/TvPage";
import ActorActressPage from "./components/ActorActressPage";
import NavBar from "./components/elements/NavBar";
import SearchResultsPage from "./components/SearchResultsPage";

const App = () => (
  <>
    <Router>
      <Switch>
        <Provider store={store}>

          <NavBar/>

          <Route exact path="/" component={HomePage}/>

          <Route path="/search" component={SearchResultsPage}/>

          <Route path="/movie/:movieId" component={MoviePage}/>

          <Route path="/tv/:tvId" component={TvPage}/>

          <Route path="/person/:personId" component={ActorActressPage}/>

        </Provider>
      </Switch>
    </Router>
  </>
);

export default App;
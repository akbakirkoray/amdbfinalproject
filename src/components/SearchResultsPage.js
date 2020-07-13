import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import styled from 'styled-components';
import {fetchResults, setLoader} from "../redux";
import MoviePoster from "./elements/MoviePoster";
import ActorPoster from "./elements/ActorPoster";
import Spinner from "react-bootstrap/Spinner";

const FullPage = styled.div`
background-color: black;
min-height:100vh;
width:100%;
padding-bottom: 5vh;
@media screen and (min-width: 320px) and (max-width: 767px) {
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}`;

const SearchResultText = styled.p`
text-align: center;
font-weight: bold;
font-size:2vw;
font-family: 'Mandali', sans-serif;
padding-bottom: 1rem;
color: white;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 1.5rem;
padding: 0;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 2rem;
padding: 0;
}`;

const SearchResultsPage = (props) => {

  const [link, setLink] = useState("");

  useEffect(() => {
    props.fetchResults(props.fetchURL);
    setLink(props.searchType);
    return () => {
      props.setLoader();
    };
  }, [props.fetchURL, props.searchType]);

  return (
    <FullPage>
      <SearchResultText>Search Results</SearchResultText>

      {props.loading
        ?
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
        :
        <div>
          <MoviePoster link={link}/>
          {props.searchType == "person" ?
            <ActorPoster actorData={props.popularResults}/>
            : null}
        </div>
      }
    </FullPage>
  );
};

const mapStateToProps = state => {
  return {
    fetchURL: state.reducerUrl.fetchURL,
    popularResults: state.reducerUrl.popularResults,
    popularType: state.reducerUrl.popularType,
    searchType: state.reducerUrl.searchType,
    loading: state.reducerUrl.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchResults: url => dispatch(fetchResults(url)),
    setLoader: () => dispatch(setLoader())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResultsPage);

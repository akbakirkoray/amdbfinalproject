import React, {useState, useEffect, useMemo} from "react";
import {useSelector, useDispatch} from 'react-redux';
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

const SearchResultsPage = () => {

  const [link, setLink] = useState("");

  const fetchURL = useSelector(state => state.reducerUrl.fetchURL);
  const popularResults = useSelector(state => state.reducerUrl.popularResults);
  const searchType = useSelector(state => state.reducerUrl.searchType);
  const loading = useSelector(state => state.reducerUrl.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setLoader());
    };
  }, []);

  useMemo(() => {
    dispatch(fetchResults(fetchURL));
  }, [fetchURL]);

  useMemo(() => {
    setLink(searchType);
  }, [searchType]);

  return (
    <FullPage>
      <SearchResultText>Search Results</SearchResultText>

      {loading
        ?
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
        :
        <div>
          <MoviePoster link={link}/>

          {searchType === "person" ?
            <ActorPoster actorData={popularResults}/>
            : null}
        </div>
      }
    </FullPage>
  );
};

export default SearchResultsPage;

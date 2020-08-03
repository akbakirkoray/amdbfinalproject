import React, {useEffect, useState, useCallback, useMemo} from "react";
import styled from 'styled-components';
import {fetchResults, increasePage, decreasePage, setLoader, resetSearch, setSearchTerm} from "../redux";
import {useSelector, useDispatch} from 'react-redux';
import MoviePoster from "./elements/MoviePoster";
import MovieTvToggle from "./elements/MovieTvToggle";

const FullPage = styled.div`
background-color: black;
height:max-content;
width:100%;
`;

const PrevNextButtonMain = styled.div`
text-align: center;
background-color: black;
`;

const PrevNextButton = styled.button`
background-color: #545b62;
color:white;
border-radius: 1rem;
padding: 0.5rem;
border: none;
font-weight: bold;
font-size: 2rem;
margin: 1rem 1rem 2rem 1rem;
font-family: 'Mandali', sans-serif;
:hover {
opacity: 0.8;
color:black;
}  
:focus {
outline: 0;
}

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 1rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 1.5rem;
}`;

const HomePage = () => {

  const [link, setLink] = useState("movie");

  const fetchURL = useSelector(state => state.reducerUrl.fetchURL);
  const page = useSelector(state => state.reducerUrl.page);
  const totalPages = useSelector(state => state.reducerUrl.totalPages);
  const searchTerm = useSelector(state => state.reducerUrl.searchTerm);
  const popularType = useSelector(state => state.reducerUrl.popularType);

  const dispatch = useDispatch();

  // FETCH ON MOUNT & PREV & NEXT
  useMemo(() => {
    dispatch(fetchResults(fetchURL));
  }, [fetchURL, page]);

  useEffect(() => {
    dispatch(setSearchTerm(""));
    return () => {
      dispatch(setLoader());
    };
  }, []);

  useMemo(() => {
    setLink(popularType);
  }, [popularType]);
  // FETCH ON MOUNT & PREV & NEXT

  // PREV & NEXT BUTTONS
  const onIncrement = useCallback(() => {
    if (page !== totalPages) {
      dispatch(increasePage());
    } else {
      return null;
    }
  }, []);

  const onDecrement = useCallback(() => {
    if (page > 1) {
      dispatch(decreasePage());
    } else {
      return null;
    }
  }, []);
  // PREV & NEXT BUTTONS

  return (
    <FullPage>
      <MovieTvToggle/>

      {/* POPULAR MOVIE/TV LIST || MOVIE/TV SEARCH RESULT LIST */}
      <MoviePoster link={link}/>
      {/* POPULAR MOVIE/TV LIST || MOVIE/TV SEARCH RESULT LIST */}

      {/*CONTROL BUTTONS*/}
      {!searchTerm && (

        <PrevNextButtonMain>
          <PrevNextButton
            type="button"
            name="PrevButton"
            disabled={page === 1}
            onClick={onDecrement}>
            Prev
          </PrevNextButton>

          <PrevNextButton
            type="button"
            name="NextButton"
            onClick={onIncrement}>Next
          </PrevNextButton>
        </PrevNextButtonMain>

      )}
      {/*CONTROL BUTTONS*/}

    </FullPage>
  );
};

export default HomePage;

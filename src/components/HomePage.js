import React, {useEffect, useState, useCallback} from "react";
import {connect} from "react-redux";
import styled from 'styled-components';
import {fetchResults, increasePage, decreasePage, setLoader} from "../redux";
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

const HomePage = (props) => {

  const [link, setLink] = useState("movie");

  // FETCH ON MOUNT & PREV & NEXT
  useEffect(() => {
    props.fetchResults(props.fetchURL);
    setLink(props.popularType);
    return () => {
      props.setLoader();
    };
  }, [props.popularType, props.page]);
  // FETCH ON MOUNT & PREV & NEXT

  // PREV & NEXT BUTTONS
  const onIncrement = useCallback(() => handleIncrement(), [handleIncrement]);

  function handleIncrement() {
    if (props.page !== props.totalPages) {
      props.increasePage();
    } else {
      return null;
    }
  };

  const onDecrement = useCallback(() => handleDecrement(), [handleDecrement]);

  function handleDecrement() {
    if (props.page > 1) {
      props.decreasePage();
    } else {
      return null;
    }
  };
  // PREV & NEXT BUTTONS

  return (
    <FullPage>
      <MovieTvToggle/>

      {/* POPULAR MOVIE/TV LIST || MOVIE/TV SEARCH RESULT LIST */}
      <MoviePoster link={link}/>
      {/* POPULAR MOVIE/TV LIST || MOVIE/TV SEARCH RESULT LIST */}

      {/*CONTROL BUTTONS*/}
      {!props.searchTerm && (

        <PrevNextButtonMain>
          <PrevNextButton
            type="button"
            name="PrevButton"
            disabled={props.page === 1}
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

const mapStateToProps = state => {
  return {
    fetchURL: state.reducerUrl.fetchURL,
    page: state.reducerUrl.page,
    totalPages: state.reducerUrl.totalPages,
    popularResults: state.reducerUrl.popularResults,
    searchTerm: state.reducerUrl.searchTerm,
    popularType: state.reducerUrl.popularType,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchResults: url => dispatch(fetchResults(url)),
    increasePage: () => dispatch(increasePage()),
    decreasePage: () => dispatch(decreasePage()),
    setLoader: () => dispatch(setLoader())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import styled from 'styled-components';
import Spinner from 'react-bootstrap/Spinner';
import {IMAGE_BASE_URL, POSTER_SIZE} from "../../endpointConstants";

const FlexMovieList = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
background-color: black;
justify-content: center;
`;

const FlexMoviePoster = styled.img`
display: flex;
flex-direction: row;
flex-wrap: wrap;
background-color: black;
justify-content: center;
margin: 1rem;
width: 15vw;
height: auto;
border: 0.3rem solid gray;
border-radius: 1rem;
:hover {
opacity: 0.8;
}
    
animation: fade-in-fwd 2s ease-in-out both;

@keyframes fade-in-fwd {
  0% {
    transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    transform: translateZ(0);
    opacity: 1;
  }
}


@media screen and (min-width: 320px) and (max-width: 767px) {
width: 40vw;
border: 0.2rem solid gray;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
width: 25vw;
border: 0.2rem solid gray;
}`;

const MoviePoster = (props) => {

  return (
    <FlexMovieList>

      {props.loading ?

        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>

        : props.searchType === "movie" || props.searchType === "tv" ?

          props.popularResults.map((movie, index) => (
            <Link to={`/${props.link}/${movie.id}`} key={index}>
              {movie.poster_path ? <FlexMoviePoster src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`} alt="Poster"/> : null}
            </Link>))

          : null}

    </FlexMovieList>
  );
};

const mapStateToProps = state => {
  return {
    popularResults: state.reducerUrl.popularResults,
    searchType: state.reducerUrl.searchType,
    loading: state.reducerUrl.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviePoster);



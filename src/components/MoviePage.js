import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {fetchMovieDetails,setLoader} from "../redux";
import MovieInfo from "./elements/MovieInfo";
import ActorPoster from "./elements/ActorPoster";
import Spinner from 'react-bootstrap/Spinner';

const MoviePage = (props) => {

  const cast = useSelector(state => state.reducerUrl.movieTvDetailResults.cast.cast);
  const loading = useSelector(state => state.reducerUrl.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieDetails(props.match.params.movieId));
    return () => {
     dispatch(setLoader());
    };
  }, []);

  return (
    <>
      {loading ? <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
        :
        <div>
          <MovieInfo/>
          <ActorPoster actorData={cast}/>
        </div>
      }
    </>
  );
};


export default MoviePage;

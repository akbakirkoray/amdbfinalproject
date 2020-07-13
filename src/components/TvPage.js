import React, {useEffect} from "react";
import {connect} from "react-redux";
import {fetchTVDetails, setLoader} from "../redux";
import MovieInfo from "./elements/MovieInfo";
import ActorPoster from "./elements/ActorPoster";
import Spinner from 'react-bootstrap/Spinner';

const MoviePage = (props) => {

  useEffect(() => {
    props.fetchTVDetails(props.match.params.tvId);
    return () => {
      props.setLoader();
    };
  }, []);

  return (
    <>
      {props.loading ? <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
        :
        <div>
          <MovieInfo/>
          <ActorPoster actorData={props.cast}/>
        </div>
      }
    </>
  );
};

const mapStateToProps = state => {
  return {
    cast: state.reducerUrl.movieTvDetailResults.cast.cast,
    loading: state.reducerUrl.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTVDetails: id => dispatch(fetchTVDetails(id)),
    setLoader: () => dispatch(setLoader())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviePage);

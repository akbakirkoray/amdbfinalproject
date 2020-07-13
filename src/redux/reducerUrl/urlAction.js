import {
  FETCH_POPULAR,
  INCREASE_PAGE,
  DECREASE_PAGE,
  SET_SEARCH_TYPE,
  SET_SEARCH_TERM,
  PERFORM_SEARCH,
  RESET_SEARCH,
  SWITCH_TO_TV,
  FETCH_TV_DETAILS,
  FETCH_MOVIE_DETAILS,
  FETCH_PERSON_DETAILS,
  SET_LOADER
} from "./urlTypes";

import {API_KEY, BASE_URL} from "../../endpointConstants";

import axios from "axios";

export const fetchResults = (url) => {
  return (dispatch) => {
    axios.get(url)
      .then((res) => {
        dispatch(fetchedResults(res.data));
      });
  };
};

export const fetchedResults = (movies) => {
  return {
    type: FETCH_POPULAR,
    payload: movies
  };
};

export const increasePage = () => {
  return {
    type: INCREASE_PAGE
  };
};

export const decreasePage = () => {
  return {
    type: DECREASE_PAGE
  };
};

export const searchType = (type) => {
  return {
    type: SET_SEARCH_TYPE,
    payload: type
  };
};

export const searchTerm = (term) => {
  return {
    type: SET_SEARCH_TERM,
    payload: term
  };
};

export const performSearch = () => {
  return {
    type: PERFORM_SEARCH,
  };
};

export const resetSearch = () => {
  return {
    type: RESET_SEARCH,
    payload: "movie"
  };
};

export const switchToTv = () => {
  return {
    type: SWITCH_TO_TV,
    payload: "tv"
  };
};

export const setLoader = (data) => {
  return {
    type: SET_LOADER,
    payload: data
  };
};

export const fetchMovieDetails = (id) => {
  return (dispatch) => {
    axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images,credits,reviews,external_ids`)
      .then((res) => {
        dispatch(fetchedMovieDetails(res.data));
      });
  };
};

export const fetchedMovieDetails = (data) => {
  return {
    type: FETCH_MOVIE_DETAILS,
    payload: data
  };
};

export const fetchTVDetails = (id) => {
  return (dispatch) => {
    axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,images,credits,reviews,external_ids`)
      .then((res) => {
        dispatch(fetchedTvDetails(res.data));
      });
  };
};

export const fetchedTvDetails = (data) => {
  return {
    type: FETCH_TV_DETAILS,
    payload: data
  };
};

export const fetchPersonDetails = (id) => {
  return (dispatch) => {
    axios.get(`${BASE_URL}/person/${id}?api_key=${API_KEY}&append_to_response=credits,images,external_ids`)
      .then((res) => {
        dispatch(fetchedPersonDetails(res.data));
      });
  };
};

export const fetchedPersonDetails = (data) => {
  return {
    type: FETCH_PERSON_DETAILS,
    payload: data
  };
};

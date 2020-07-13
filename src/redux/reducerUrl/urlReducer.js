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

const initialState = {
  fetchURL: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  searchTerm: "",
  searchType: "movie", // initial
  popularType: "movie", // initial
  page: 1,
  popularResults: [],
  totalPages: 0,
  loading: true,

  movieTvDetailResults: {
    dataObject: {},
    cast: {},
    external_ids: {},
    videos: [],
  },

  personDetails: {
    personData: {},
    personCredits: [],
    personImages: [],
    personExternalIDs: {},
  },
};

const urlReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_POPULAR:
      return {
        ...state,
        popularResults: [...action.payload.results],
        totalPages: action.payload.total_pages,
        loading: false,
      };

    case INCREASE_PAGE:
      return {
        ...state,
        page: state.page + 1,
        fetchURL: `${BASE_URL}/${state.popularType}/popular?api_key=${API_KEY}&language=en-US&page=${state.page + 1}`,
        index: 0
      };

    case DECREASE_PAGE:
      return {
        ...state,
        page: state.page > 1 ? state.page - 1 : state.page,
        fetchURL: `${BASE_URL}/${state.popularType}/popular?api_key=${API_KEY}&language=en-US&page=${state.page > 1 ? state.page - 1 : state.page}`,
        index: 0
      };

    case SET_SEARCH_TYPE:
      return {
        ...state,
        searchType: action.payload,
      };

    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };

    case PERFORM_SEARCH:
      return {
        ...state,
        fetchURL: `${BASE_URL}/search/${state.searchType}?api_key=${API_KEY}&language=en-US&query=${state.searchTerm}`,
      };

    case RESET_SEARCH:
      return {
        ...state,
        popularType: action.payload,
        fetchURL: `${BASE_URL}/${action.payload}/popular?api_key=${API_KEY}&language=en-US&page=1`
      };

    case SWITCH_TO_TV:
      return {
        ...state,
        popularType: action.payload,
        fetchURL: `${BASE_URL}/${action.payload}/popular?api_key=${API_KEY}&language=en-US&page=1`,
        index: 0
      };

    case SET_LOADER:
      return {
        ...state,
        loading: true,
      };

    case FETCH_MOVIE_DETAILS:
      return {
        ...state,
        movieTvDetailResults: {
          dataObject: action.payload,
          cast: {...action.payload.credits},
          external_ids: {...action.payload.external_ids},
          videos: [...action.payload.videos.results],
        },
        loading: false
      };

    case FETCH_TV_DETAILS:
      return {
        ...state,
        movieTvDetailResults: {
          dataObject: action.payload,
          cast: {...action.payload.credits},
          external_ids: {...action.payload.external_ids},
          videos: [...action.payload.videos.results],
        },
        loading: false
      };

    case FETCH_PERSON_DETAILS:
      return {
        ...state,
        personDetails: {
          personData: action.payload,
          personCredits: [...action.payload.credits.cast],
          personImages: [...action.payload.images.profiles],
          personExternalIDs: {...action.payload.external_ids},
        },
        loading: false
      };

    default:
      return state;
  }
};
export default urlReducer;
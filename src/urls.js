// CONFIGURATION
// https://api.themoviedb.org/3/configuration?api_key=019e8f375549e0bbd4a4191862ebc88f
// BASE URL
const BASE_URL = 'https://api.themoviedb.org/3/';
// API KEY
const API_KEY = '212d8b0bdb4d3a4d85ec8fd8fb57a0b2';
// MOVIE POPULAR
const POPULAR_BASE_URL = `${BASE_URL}movie/popular?api_key=${API_KEY}`;
// MULTI SEARCH WITH TITLE
const SEARCH_MULTI_BASE_URL = `${BASE_URL}search/movie?api_key=${API_KEY}&query=`;
// IMAGES
const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';
// Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'w1280';
// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w500';

export { 
  SEARCH_MULTI_BASE_URL,
  POPULAR_BASE_URL,
  BASE_URL, API_KEY,
  IMAGE_BASE_URL, 
  BACKDROP_SIZE, 
  POSTER_SIZE 
};

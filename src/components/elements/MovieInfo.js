import React, {memo} from "react";
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import NoImage from "../images/Noimage.svg";
import {IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE} from "../../endpointConstants.js";

const BackgroundMovieInfo = styled.div`
background-color: black;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

@media screen and (min-width: 320px) and (max-width: 767px) {
background-color: black;
padding-left: 5vw;
padding-right: 5vw;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}`;

const CarouselFlex = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 90vw;
padding: 3vh 3vw;

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
flex-direction: column;
align-content: center;
align-items: center;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}`;

const MoviePoster = styled.img`
width: 25vw;
height: 100%;
border-radius: 2rem;

animation: slide-in-left 1s ease-in-out both;
@keyframes slide-in-left {
  0% {
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@media screen and (min-width: 320px) and (max-width: 767px) {
width: auto;
height: 40vh;
margin: 1vh 1vw 1vh 1vw;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
width: 35vw;
height: 100%;
}`;

const InfoContent = styled.div`
width: 50vw;
color: white;
background-color: rgba(66, 73, 73, 0.8);
border: 2px solid black;
border-radius: 2rem;
padding: 1vh 1vw;
display: flex;
flex-direction: column;
justify-content: space-between;

animation: slide-in-right 1s ease-in-out both;
@keyframes slide-in-right {
  0% {
    transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@media screen and (min-width: 320px) and (max-width: 767px) {
width: 80vw;
border-radius: 2rem;
margin-right: 1vw;
margin-bottom: 1vh;
margin-top: 1vh;
padding: 2vh 2vw;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
width: 45vw;
border-radius: 2rem;
padding: 2vh 2vw;
}`;

const MovieTitle = styled.p`
font-size: 2rem;
font-weight: bold;
font-family: 'Mandali', sans-serif;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 1rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 1.5rem;
}`;

const ReleaseDate = styled.p`
font-size: 1.5rem;
font-family: 'Mandali', sans-serif;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 1rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 1rem;
}`;

const Overview = styled.p`
font-size: 1rem;
text-align: justify;
font-family: 'Mandali', sans-serif;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 0.7rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 0.9rem;
}`;

const Rating = styled.p`
font-size: 1.5rem;
font-family: 'Mandali', sans-serif;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 0.8rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 1rem;
}`;

const RuntimeBudgetRevenue = styled.div`
display:flex;
justify-content:flex-start;

@media screen and (min-width: 320px) and (max-width: 767px) {
flex-direction: column;
align-items: center;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
flex-direction: column;
align-items: flex-start;
}`;

const Runtime = styled.span`
font-size: 1rem;
font-family: 'Mandali', sans-serif;
margin-right: 1rem;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 0.8rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 0.9rem;
}`;

const Budget = styled.span`
font-size: 1rem;
font-family: 'Mandali', sans-serif;
margin-right: 1rem;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 0.8rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 0.9rem;
}`;

const Revenue = styled.span`
font-size: 1rem;
font-family: 'Mandali', sans-serif;
margin-right: 1rem;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 0.8rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 0.9rem;
}`;

const ExternalLinkDiv = styled.div`
display:flex;
justify-content: flex-end;

@media screen and (min-width: 320px) and (max-width: 767px) {
justify-content: space-around;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
justify-content: flex-end;
}`;

const ExternalLink = styled.img`
width: 2.5vw;
margin: 0.5rem 0.5rem;

@media screen and (min-width: 320px) and (max-width: 767px) {
width: 8vw;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
width: 4vw;
}`;

const IframeDiv = styled.div`
display:flex;
justify-content: flex-start;
overflow-x: scroll !important;
margin-top: 2rem;
padding: 1rem;
width: 90vw;

@media screen and (min-width: 320px) and (max-width: 767px) {
margin-top: 0;
padding: 0;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
margin-top: 0;
padding: 0;
}`;

const Iframe = styled.iframe`
width: 30vw;
height:30vh;
border-radius: 2rem;
margin: 1rem;
display:inline;

animation: fade-in-fwd 3s ease-in-out both;
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
height:20vh;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
width: 35vw;
height:17vh;
}`;

const MovieInfo = memo(() => {

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0
  });

  const movieTvDetailResults = useSelector(state => state.reducerUrl.movieTvDetailResults.dataObject);
  const videos = useSelector(state => state.reducerUrl.movieTvDetailResults.videos);
  const external_ids = useSelector(state => state.reducerUrl.movieTvDetailResults.external_ids);

  return (
    <BackgroundMovieInfo> {/* BLACK BACKGROUND */}

      <CarouselFlex style={{
        backgroundImage: `url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${movieTvDetailResults.backdrop_path})`,
        backgroundSize: "cover",
        borderRadius: "2rem",
        backgroundPosition: "center center"
      }}>

        <MoviePoster
          src={movieTvDetailResults.poster_path
            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movieTvDetailResults.poster_path}`
            : NoImage}
          clickable={false}
        />

        <InfoContent>

          <MovieTitle>
            {movieTvDetailResults.title
              ? movieTvDetailResults.title
              : movieTvDetailResults.name}
          </MovieTitle>

          <ReleaseDate>{movieTvDetailResults.release_date ?
            `Release Date : ${movieTvDetailResults.release_date}`
            : `First Air Date : ${movieTvDetailResults.first_air_date}`}
          </ReleaseDate>

          <Overview>
            {movieTvDetailResults.overview}
          </Overview>

          <Rating>
            Rating : {movieTvDetailResults.vote_average}
          </Rating>

          <RuntimeBudgetRevenue>
            {movieTvDetailResults.runtime ?
              <Runtime>{`Runtime : ${Math.floor(movieTvDetailResults.runtime / 60)}h ${Math.floor(movieTvDetailResults.runtime % 60)}min`}</Runtime>
              : null}
            {movieTvDetailResults.episode_run_time ?
              <Runtime>{`Episode runtime : ${movieTvDetailResults.episode_run_time}min`}</Runtime>
              : null}
            {movieTvDetailResults.budget ?
              <Budget>{`Budget : ${formatter.format(movieTvDetailResults.budget)}`}</Budget>
              : null}
            {movieTvDetailResults.revenue ?
              <Revenue>{`Revenue : ${formatter.format(movieTvDetailResults.revenue)}`}</Revenue>
              : null}
          </RuntimeBudgetRevenue>

          <ExternalLinkDiv>
            {external_ids.facebook_id ? <a href={`https://www.facebook.com/${external_ids.facebook_id}/`} target="_blank" rel="noopener noreferrer">
              <ExternalLink src="../images/facebook.svg" alt="facebook"/>
            </a> : null}
            {external_ids.instagram_id ? <a href={`https://www.instagram.com/${external_ids.instagram_id}/`} target="_blank" rel="noopener noreferrer">
              <ExternalLink src="../images/instagram.svg" alt="instagram"/>
            </a> : null}
            {external_ids.twitter_id ? <a href={`https://twitter.com/${external_ids.twitter_id}/`} target="_blank" rel="noopener noreferrer">
              <ExternalLink src="../images/twitter.svg" alt="twitter"/>
            </a> : null}
            {external_ids.imdb_id ? <a href={`https://www.imdb.com/title/${external_ids.imdb_id}/`} target="_blank" rel="noopener noreferrer">
              <ExternalLink src="../images/imdb1.svg" alt="imdb"/>
            </a> : null}
          </ExternalLinkDiv>

        </InfoContent>

      </CarouselFlex>

      <IframeDiv>
        {videos.map((element, index) =>
          <Iframe
            key={index}
            src={`https://www.youtube.com/embed/${element.key}/?autoplay=0&controls=1&disablekb=1&`}
            frameBorder="0"
            allowFullScreen="allowFullScreen"
          >
          </Iframe>
        )}
      </IframeDiv>

    </BackgroundMovieInfo>
  );
});

export default MovieInfo;


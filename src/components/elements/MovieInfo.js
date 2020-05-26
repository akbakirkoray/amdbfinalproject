import React from "react";
// OTHER
import NoImage from "../images/Noimage.svg";
// URLs
import {IMAGE_BASE_URL, POSTER_SIZE} from "../../urls.js";
import {BACKDROP_SIZE} from "../../urls.js";
// CSS
import "../FlexMovie&ActorPoster.css";
import "../Carousel&MovieInfo.css";

const MovieInfo = ({movie}) => (

    <div className="backgroundMovieInfo">

        <div className="CarouselFlex BackgroundPoster" style={{
            backgroundImage: "url(" + `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}` + ")", // ANOTHER WAY ??
            backgroundSize: "cover",
            borderRadius: "2rem"
        }}>

            <img
                src={movie.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                    : NoImage}
                clickable={false}
                alt="moviethumb"
                className="MoviePoster"
            />

            <div className="InfoContent">
                <p className="MovieTitle">{movie.title}</p>
                <p className="ReleaseDate">{`Release Date : ${movie.release_date}`}</p>
                <p className="Overview">{movie.overview}</p>
                <p className="Rating">Rating : {movie.vote_average}</p>
            </div>

        </div>

    </div>
);

export default MovieInfo;

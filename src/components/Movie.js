import React from "react";
// Components
import MovieInfo from "./elements/MovieInfo";
import ActorPoster from "./elements/ActorPoster";
// CSS
import "./FlexMovie&ActorPoster.css";
// COMPONENTS
import NavBar from "./elements/NavBar.js";
// CUSTOM HOOK
import {useMovieHooks} from "./CustomHooks/useMovieHooks";

const Movie = ({movieId}) => {

    const [movie] = useMovieHooks(movieId);

    return (
        <>
            <NavBar/>

            <MovieInfo movie={movie}/>

            <div className="FlexActorList">
                {movie.actors ?
                    movie.actors.map(actor => (
                        <ActorPoster key={actor.credit_id} actor={actor}/>
                    )) : null}
            </div>

        </>
    );
};

export default Movie;
import React, {useState} from "react";
import {Link} from "@reach/router";
// CAROUSEL
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
// CSS
import "./Carousel&MovieInfo.css";
import "./ControlButtons.css";
import "./FlexMovie&ActorPoster.css";
// URLs
import {
    SEARCH_MULTI_BASE_URL,
    POPULAR_BASE_URL,
    POSTER_SIZE,
    BACKDROP_SIZE,
    IMAGE_BASE_URL
} from "../urls.js";
// COMPONENTS
import NavBar from "./elements/NavBar.js";
import MoviePoster from "./elements/MoviePoster";
// CUSTOM HOOK
import {useHomeHooks} from "./CustomHooks/useHomeHooks";

const Home = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const [
        {state: {movies}},
        index,
        handleSelect,
        currentPage,
        fetchMovies,
        handleDecrement,
        handleIncrement
    ] = useHomeHooks();

    const searchMovies = search => {
        const endpoint = search ? SEARCH_MULTI_BASE_URL + search : POPULAR_BASE_URL;
        setSearchTerm(search);
        fetchMovies(endpoint); // From useHomeHooks
    };

    return (
        <div className="FullPage">
            <NavBar searchCallback={searchMovies}/>

            {/* CAROUSEL */}
            {!searchTerm && (
                <Carousel className="CarouselMainFlex" activeIndex={index} onSelect={handleSelect}>
                    {movies.map((movie) =>
                        <Carousel.Item key={movie.id} style={{
                            backgroundImage: "url(" + `${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}` + ")", // ANOTHER WAY ??
                            backgroundSize: "cover",
                            borderRadius: "2rem"
                        }}>
                            <div className="CarouselFlex">
                                <Link to={`/${movie.id}`}>
                                    <img
                                        className="MoviePoster"
                                        src={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.poster_path}`}
                                        alt=""
                                    />
                                </Link>
                                <div className="InfoContent">
                                    <p className="MovieTitle">{movie.title}</p>
                                    <p className="ReleaseDate">{`Release Date : ${movie.release_date}`}</p>
                                    <p className="Overview">{movie.overview}</p>
                                    <p className="Rating">Rating : {movie.vote_average}</p>
                                </div>
                            </div>

                        </Carousel.Item>
                    )}
                </Carousel>
            )}
            {/* CAROUSEL */}

            {/* POPULAR MOVIE LIST / MOVIE SEARCH RESULT LIST */}
            <div className="FlexMovieList">
                {movies.map((movie) =>
                    (
                        <MoviePoster
                            key={movie.id}
                            clickable
                            image={
                                movie.poster_path
                                    ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                                    : null // or null
                            }
                            movieId={movie.id}
                        />
                    )
                )}
            </div>
            {/* POPULAR MOVIE LIST / MOVIE SEARCH RESULT LIST */}

            {/*CONTROL BUTTONS*/}
            {!searchTerm && (
                <div className="PrevNextButtonMain">
                    <button
                        className="PrevNextButton"
                        type="button"
                        name="PrevButton"
                        disabled={currentPage === 1}
                        onClick={() => {
                            handleDecrement();
                        }}>
                        <img
                            className="PrevImg"
                            src="./images/previous.svg"
                            alt="Prev"
                        />Previous
                    </button>

                    <button
                        className="PrevNextButton"
                        type="button"
                        name="NextButton"
                        onClick={() => {
                            handleIncrement();
                        }}>Next<img
                        className="NextImg"
                        src="./images/next.svg"
                        alt="Next"
                    />
                    </button>
                </div>
            )}
            {/*CONTROL BUTTONS*/}

        </div>
    );
};

export default Home;

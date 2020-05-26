import React from "react";
import {Link} from "@reach/router";
// CSS
import "../FlexMovie&ActorPoster.css";

const MoviePoster = ({image, movieId, clickable}) => {

    return (
        <>
            {clickable ?
                    <Link to={`/${movieId}`}>
                        {image ? <img className="FlexMoviePoster" src={image} alt="Poster"/> : null}
                    </Link>
                :
                <img src={image} alt="NoPoster"/>
            }
        </>
    );

};

export default MoviePoster;


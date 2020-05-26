import React from "react";
// CSS
import "../FlexMovie&ActorPoster.css";
// OTHER
import NoImage from "../images/BlankAvatar.png";
// URLs
import {IMAGE_BASE_URL, POSTER_SIZE} from "../../urls.js";

const ActorPoster = ({actor}) => (

    <div  className="FlexActorPoster">
        <img
            src={
                actor.profile_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                    : NoImage
            }
            className="ActorPoster"
            alt="ActorImage"
        />
        <div className="ActorName">{actor.name}</div>
        <div className="ActorRole">{actor.character}</div>
    </div>
);

export default ActorPoster;

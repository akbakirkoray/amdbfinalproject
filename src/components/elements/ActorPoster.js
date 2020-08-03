import React from "react";
import {Link} from "react-router-dom";
import styled from 'styled-components';
import NoImage from "../images/BlankAvatar.png";
import {IMAGE_BASE_URL} from "../../endpointConstants.js";

const FlexActorList = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
background-color: black;
justify-content: center;
text-align: center;
padding-top: 1rem;
padding-bottom: 2rem;
`;

const FlexActorPoster = styled.div`
display: flex;
flex-direction: column;
align-items: center;
align-content: center;
justify-content: stretch;
margin: 1rem;
border-radius: 1rem;
background-color: gray;
padding-bottom: 2rem;
width: 16vw;
height: auto;

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
margin: 0.5rem;
padding-bottom: 1rem;
width: 40vw;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
margin: 1rem;
padding-bottom: 1.5rem;
width: 25vw;
}`;

const ActorPosterImg = styled.img`
width: 100%;
height: auto;
object-fit: cover;
border-radius: 1rem;
border: 0.3rem solid gray;
:hover {
opacity: 0.8;
}

@media screen and (min-width: 320px) and (max-width: 767px) {
border: 0.2rem solid gray;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}`;

const ActorName = styled.div`
font-size: 1rem;
padding: 0.5rem 0 0.5rem 0;
color: black;
font-weight: bold;
border-bottom: 0.1rem solid black;
font-family: 'Mandali', sans-serif;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 0.9rem;
padding: 00.4rem 0 0.4rem 0;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 0.9rem;
padding: 0.4rem 0 0.4rem 0;
}`;

const ActorRole = styled.div`
font-size: 1rem;
padding: 0.5rem 0 0 0;
color: black;
font-weight: bold;
font-family: 'Mandali', sans-serif;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 0.9rem;
padding: 0.4rem 0 0 0;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 0.9rem;
padding: 0.4rem 0 0 0;
}`;

const ActorPoster = (props) => {

  return (
    <FlexActorList>
      {props.actorData ?
        props.actorData.map((actor, index) => (
          <FlexActorPoster key={index}>
            <Link to={`/person/${actor.id}`} key={index}>
              <ActorPosterImg
                src={
                  actor.profile_path
                    ? `${IMAGE_BASE_URL}w342${actor.profile_path}`
                    : NoImage
                }
                alt="ActorImage"
              />
            </Link>
            <ActorName>{actor.name}</ActorName>
            <ActorRole>{actor.character ? actor.character : null}</ActorRole>
          </FlexActorPoster>))
        : null
      }

    </FlexActorList>
  );
};

export default ActorPoster;



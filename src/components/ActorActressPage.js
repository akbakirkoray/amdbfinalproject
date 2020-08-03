import React, {useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {fetchPersonDetails, setLoader} from "../redux";
import styled from 'styled-components';
import {Link} from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import "./style.css";

const FullPage = styled.div`
background-color: black;
padding:0 5vw 0 5vw;
height:max-content;
width:100%;
color: white;

@media screen and (min-width: 320px) and (max-width: 767px) {
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}`;

const Name = styled.p`
font-size: 3rem;
font-weight: bold;
font-family: 'Mandali', sans-serif;

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
text-align: center;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
text-align: center;
}`;

const PhotoInfoDiv = styled.div`
display: flex;
width: 90vw;
justify-content: space-between;

@media screen and (min-width: 320px) and (max-width: 767px) {
flex-direction: column;
align-items: center;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}`;

const Photo = styled.img`
border-radius: 2rem;
width: 25vw;
height: 100%;

animation: slide-in-left 2s ease-in-out both;
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
width: 60vw;
margin-bottom: 1rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
width: 35vw;
}`;

const InfoDiv = styled.div`
width: 60vw;
font-size: 1.2rem;
text-align: justify;
font-family: 'Mandali', sans-serif;
display:flex;
flex-direction: column;

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
width: 90vw;
font-size: 0.9rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
width: 52vw;
font-size: 1rem;
}`;

const ExternalLinkDiv = styled.div`
display:flex;
justify-content: flex-end;

@media screen and (min-width: 320px) and (max-width: 767px) {
justify-content: center;
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

const OtherPhotosDiv = styled.div`
display: flex;
padding: 1rem;
width: 90vw;
height: min-content;
overflow-x: scroll;

@media screen and (min-width: 320px) and (max-width: 767px) {
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}`;

const OtherPhoto = styled.img`
border-radius: 1rem;
margin:1rem;
width:10vw;

animation: slide-in-left 2s ease-in-out both;
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
width: 17vw;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
width: 20vw;
}`;

const CreditsOuterDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding-top: 2rem;
padding-bottom: 2rem;
width: 90vw;
font-family: 'Mandali', sans-serif;
font-size: 1.5rem;

@media screen and (min-width: 320px) and (max-width: 767px) {
padding-top: 1rem;
padding-bottom: 1rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}`;

const CreditsInnerDiv = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding-bottom: 1rem;
width: 45vw;

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
width: 90vw;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
width: 80vw;
}`;

const Title = styled.span`
font-size: 1.5rem;
font-family: 'Mandali', sans-serif;
color:white;
font-weight: bold;
:hover {
opacity: 0.8;
}

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 1rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}`;

const Character = styled.span`
font-size: 1rem;
font-family: 'Mandali', sans-serif;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 0.8rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}`;

const ReleaseDate = styled.span`
font-size: 1rem;
font-family: 'Mandali', sans-serif;
margin-left: 2rem;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 0.8rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}`;

const ActorActressPage = (props) => {

  const personData = useSelector(state => state.reducerUrl.personDetails.personData,);
  const personCredits = useSelector(state => state.reducerUrl.personDetails.personCredits);
  const personImages = useSelector(state => state.reducerUrl.personDetails.personImages);
  const personExternalIDs = useSelector(state => state.reducerUrl.personDetails.personExternalIDs);
  const loading = useSelector(state => state.reducerUrl.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPersonDetails(props.match.params.personId));
    return () => {
      dispatch(setLoader());
    };
  }, []);


  return (
    <FullPage>

      {loading ?

        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
        :
        <div>
          <Name>{personData.name}</Name>

          <PhotoInfoDiv>
            <Photo src={`https://image.tmdb.org/t/p/w342/${personData.profile_path}`}/>

            <InfoDiv>
              <p>{personData.biography}</p>
              <p>{`Born : ${personData.birthday} in ${personData.place_of_birth}`}</p>
              <p>{personData.deathday ? `Died : ${personData.deathday}` : null}</p>

              <ExternalLinkDiv>
                {personExternalIDs.facebook_id ? <a href={`https://www.facebook.com/${personExternalIDs.facebook_id}/`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink src="../images/facebook.svg" alt="facebook"/>
                </a> : null}
                {personExternalIDs.instagram_id ? <a href={`https://www.instagram.com/${personExternalIDs.instagram_id}/`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink src="../images/instagram.svg" alt="instagram"/>
                </a> : null}
                {personExternalIDs.twitter_id ? <a href={`https://twitter.com/${personExternalIDs.twitter_id}/`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink src="../images/twitter.svg" alt="twitter"/>
                </a> : null}
                {personExternalIDs.imdb_id ? <a href={`https://www.imdb.com/name/${personExternalIDs.imdb_id}/`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink src="../images/imdb1.svg" alt="imdb"/>
                </a> : null}
              </ExternalLinkDiv>
            </InfoDiv>

          </PhotoInfoDiv>

          {personImages.length > 1 ?
            <OtherPhotosDiv>
              {personImages.map((element, index) => (
                element.file_path !== personData.file_path ?
                  <a href={`https://image.tmdb.org/t/p/original${element.file_path}`} target="_blank" key={index}>
                    <OtherPhoto src={`https://image.tmdb.org/t/p/w154/${element.file_path}`}/>
                  </a>
                  : null
              ))}
            </OtherPhotosDiv>
            : null}

          <CreditsOuterDiv>
            {personCredits.sort((a, b) => {
              if (a.release_date < b.release_date) return +1;
              if (a.release_date > b.release_date) return -1;
            }).map((element, index) => (
              <CreditsInnerDiv key={index}>
                <div>
                  <Link id="TitleLink" to={`/movie/${element.id}`}>
                    <Title>{element.title}</Title>
                  </Link>
                  <br/>
                  <Character>{element.character ? `${element.character}` : null}</Character>
                </div>
                <ReleaseDate>{element.release_date ? `${element.release_date}` : null}</ReleaseDate>
              </CreditsInnerDiv>
            ))}
          </CreditsOuterDiv>
        </div>}

    </FullPage>
  );
};

export default ActorActressPage;

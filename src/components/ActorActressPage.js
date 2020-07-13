import React, {useEffect} from "react";
import {connect} from "react-redux";
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

  useEffect(() => {
    props.fetchPersonDetails(props.match.params.personId);
    return () => {
      props.setLoader();
    };
  }, []);


  return (
    <FullPage>

      {props.loading ?

        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
        :
        <div>
          <Name>{props.personData.name}</Name>

          <PhotoInfoDiv>
            <Photo src={`https://image.tmdb.org/t/p/w500/${props.personData.profile_path}`}/>

            <InfoDiv>
              <p>{props.personData.biography}</p>
              <p>{`Born : ${props.personData.birthday} in ${props.personData.place_of_birth}`}</p>
              <p>{props.personData.deathday ? `Died : ${props.personData.deathday}` : null}</p>
            </InfoDiv>
          </PhotoInfoDiv>

          {props.personImages.length > 1 ?
            <OtherPhotosDiv>
              {props.personImages.map((element, index) => (
                element.file_path !== props.personData.file_path ?
                  <a href={`https://image.tmdb.org/t/p/original${element.file_path}`} target="_blank" key={index}>
                    <OtherPhoto src={`https://image.tmdb.org/t/p/w185/${element.file_path}`}/>
                  </a>
                  : null
              ))}
            </OtherPhotosDiv>
            : null}

          <CreditsOuterDiv>
            {props.personCredits.sort((a, b) => {
              if (a.release_date < b.release_date) return +1;
              //if (a.release_date == b.release_date) return 0;
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

const mapStateToProps = state => {
  return {
    personData: state.reducerUrl.personDetails.personData,
    personCredits: state.reducerUrl.personDetails.personCredits,
    personImages: state.reducerUrl.personDetails.personImages,
    personExternalIDs: state.reducerUrl.personDetails.personExternalIDs,
    loading: state.reducerUrl.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPersonDetails: id => dispatch(fetchPersonDetails(id)),
    setLoader: () => dispatch(setLoader())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActorActressPage);

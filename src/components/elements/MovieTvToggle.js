import React, {useState, useEffect, memo, useCallback} from "react";
import styled from 'styled-components';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import {useDispatch} from 'react-redux';
import {switchToTv, resetSearch} from "../../redux";

const ButtonGroupDiv = styled.div`
display: flex;
justify-content: center;
margin-bottom: 1rem;
`;

const MovieTvToggle = memo(() => {

  const [radioValue, setRadioValue] = useState("movie");

  const radios = [
    {name: "Popular Movies", value: "movie"},
    {name: "Popular TV Shows", value: "tv"},
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    if (radioValue === "tv") {
      dispatch(switchToTv());
    } else if (radioValue === "movie") {
      dispatch(resetSearch());
    }
  }, [radioValue]);

  const handleChange = useCallback(e =>
    setRadioValue(e.currentTarget.value), []);

  return (
    <>
      <ButtonGroupDiv>
        <ButtonGroup toggle>
          {radios.map((radio, idx) => (
            <ToggleButton
              id="ToggleButton"
              key={idx}
              type="radio"
              variant="secondary"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={handleChange}>
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </ButtonGroupDiv>
    </>
  );
});

export default MovieTvToggle;
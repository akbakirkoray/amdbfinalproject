import React, {useState, useEffect, memo} from "react";
import styled from 'styled-components';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import {connect} from "react-redux";
import {switchToTv, resetSearch} from "../../redux";

const ButtonGroupDiv = styled.div`
display: flex;
justify-content: center;
margin-bottom: 1rem;
`;

const MovieTvToggle = memo((props) => {

  const [radioValue, setRadioValue] = useState("movie");

  const radios = [
    {name: "Popular Movies", value: "movie"},
    {name: "Popular TV Shows", value: "tv"},
  ];

  useEffect(() => {
    if (radioValue === "tv") {
      props.switchToTv();
    } else if (radioValue === "movie") {
      props.resetSearch();
    }
  }, [radioValue]);

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
              onChange={(e) => setRadioValue(e.currentTarget.value)}>
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </ButtonGroupDiv>
    </>
  );
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    switchToTv: () => dispatch(switchToTv()),
    resetSearch: () => dispatch(resetSearch())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieTvToggle);
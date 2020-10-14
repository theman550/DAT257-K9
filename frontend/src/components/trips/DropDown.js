import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  FieldFactory,
} from '../UI';

const StyledInput = FieldFactory(styled.input``);

const Div = styled.div`
  width: 100%;
  border: none;
  box-shadow: 0 0 1px rgba(0,0,0,0.1), 0 2px 4px 1px rgba(0,0,0, .18);
  font-size: 0.9em;
  display: flex;
  flex-direction: column;
`;

const Ul = styled.ul`
  list-style-type: none;
  text-align: left;
  margin: 0;
  padding: 0.5rem;
  -webkit-box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
  -moz-box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
  box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
  height:200px;
  overflow:hidden; 
  overflow-y:scroll;
`;

const Li = styled.li`
  color: #707386;
  padding: 10px 10px ;
  cursor: pointer;
  font-family: Kufam, sans-serif;
  font-weight: 400;

  &:hover {
    color: white;
  }
`;

const DropDown = ({ items, placeholder, valueChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState('');

  const updateText = (value) => {
    console.log('Updating text and propagating value change', value);
    setText(value);
    valueChange(value);
  };

  const onTextChange = (e) => {
    let newSuggestions = [];
    const { value } = e.target;
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      newSuggestions = items.sort().filter((v) => regex.test(v));
    }

    updateText(value);
    setSuggestions(newSuggestions);
  };

  const suggestionSelected = (city) => {
    updateText(city);
    setSuggestions([]);
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <Ul>
        {suggestions.map((city) => (
          <Li key={city} onClick={() => suggestionSelected(city)}>
            {city}
          </Li>
        ))}
      </Ul>
    );
  };

  return (
    <Div>
      <StyledInput onChange={onTextChange} placeholder={placeholder} value={text} type="text" />
      {renderSuggestions()}
    </Div>
  );
};
DropDown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string.isRequired,
  valueChange: PropTypes.func.isRequired,
};
export default DropDown;

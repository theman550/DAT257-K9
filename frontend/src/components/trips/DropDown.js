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
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    color: 'red';
    display: flex;
    flex-direction: column;
   }
  `;

const Ul = styled.ul`
 
    list-style-type: none;
    text-align: left;
    margin: 0;
    padding: 10px;
    backgroundColor: 'red';
    color:'red';
    box-shadow: 20px 0 1px rgba(0,0,0,0.1), 0 20px 4px 1px rgba(0,0,0, .18);
    height:200px;
    overflow:hidden; 
    overflow-y:scroll;
    border: 1px;
    border-color: #8064f7;
    border-style: solid;
    border-radius: 20px;
  `;

const Li = styled.li`
 
  color: #707386;
  padding: 10px 10px ;
 cursor: pointer;
 font-family: Kufam, sans-serif;
    font-weight: 400;

 &:hover {
    color: white;
    text-decoration: underline;
}

`;

const DropDown = ({ items, placeholder }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState('');

  const onTextChange = (e) => {
    let suggestions = [];
    const { value } = e.target;
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = items.sort().filter((v) => regex.test(v));
    }

    setText(value);
    setSuggestions(suggestions);
  };

  const suggestionSelected = (city) => {
    console.log(city); // problem with set state
    setText(city);
    setSuggestions([]);
    console.log(text);
  };

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <Ul>
        {suggestions.map((city) => (
          <Li key={city} onClick={(e) => suggestionSelected(city)}>
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
  items: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
};
export default DropDown;

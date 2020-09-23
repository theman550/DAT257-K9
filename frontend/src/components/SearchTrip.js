import React from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
  font-family: Kufam;
  color: #f0ebff;
  max-width: 400px;
  padding: 1rem;

  & button {
    font-size: 1.2rem;
    font-weight: bold;
    width: 100%;
    background-color: #8064f7;
    color: #f0ebff;
    border: none;
    border-radius: 0.3rem;
    padding: 0.5rem;
    margin-top: 0.5rem;
    cursor: pointer;
  }

  & button:hover {
    background-color: #5945ad;
  }

  & input {
    color: #f0ebff;
    background-color: #1a1a1a;
    border: 1px solid grey;
    border-radius: 0.3rem;
    padding: 0.2rem;
    margin: 0.2rem 0;
  }
`

const StyledTextRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;

  &:nth-child(1) {
    margin: 0;
  }
`

const StyledSelectRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`

const StyledSelectColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  & input::-webkit-calendar-picker-indicator {
    display: none;
  }

  &:nth-child(1) {
    margin-right: 1rem;
  }

  &:nth-child(2) {
    margin-left: 1rem;
  }
`

const SearchTrip = () => {
  return (
    <StyledForm aria-label='Search form'>
      <StyledTextRow>
        <label htmlFor='from'>From</label>
        <input type='text' id='from' placeholder='Enter start location...'></input>
      </StyledTextRow>
      <StyledTextRow>
        <label htmlFor='to'>To</label>
        <input type='text' id='to' placeholder='Enter destination...'></input>
      </StyledTextRow>
      <StyledSelectRow>
        <StyledSelectColumn>
          <label htmlFor='date'>Date</label>
          <input type='date' id='date'></input>
        </StyledSelectColumn>
        <StyledSelectColumn>
          <label htmlFor='time'>Time</label>
          <input type='time' id='time'></input>
        </StyledSelectColumn> 
      </StyledSelectRow>
      <StyledSelectRow>
        <StyledSelectColumn>
          <label htmlFor='seats'>Seats</label>
          <input type='number' id='seats' min='0' max='4'></input>
        </StyledSelectColumn>
        <StyledSelectColumn>
          <label htmlFor='price'>Price</label>
          <input type='number' id='price' min='0' max='1000'></input>
        </StyledSelectColumn>
      </StyledSelectRow>
      <StyledSelectRow>
        <button type='submit'>Search</button>
      </StyledSelectRow>
    </StyledForm>
  )
}

export default SearchTrip

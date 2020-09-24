import React, {useState} from 'react'
import styled from 'styled-components'
import {X} from 'react-feather'
import {
  FieldFactory,
  PrimaryButton,
  Label
} from './UI';

const StyledInput = FieldFactory(styled.input``)

const CloseButton = styled(X)`

`

const Modal = styled.div`
  /*display: none;*/
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-animation-name: fadeIn; /* Fade in the background */
  -webkit-animation-duration: 0.4s;
  animation-name: fadeIn;
  animation-duration: 0.4s

  @-webkit-keyframes slideIn {
    from {bottom: -300px; opacity: 0} 
    to {bottom: 0; opacity: 1}
  }

  @keyframes slideIn {
    from {bottom: -300px; opacity: 0}
    to {bottom: 0; opacity: 1}
  }

  @-webkit-keyframes fadeIn {
    from {opacity: 0} 
    to {opacity: 1}
  }

  @keyframes fadeIn {
    from {opacity: 0} 
    to {opacity: 1}
  }
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.fill};
  padding: 1rem;
  margin: 30% auto;
  width: 80%;
  border-radius: 10px;
  -webkit-box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
  -moz-box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
  box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);

  /* modal functionality */
  position: fixed;
  bottom: 0;
  -webkit-animation-name: slideIn;
  -webkit-animation-duration: 0.4s;
  animation-name: slideIn;
  animation-duration: 0.4s
`

const StyledTextRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.75rem;

  &:nth-child(1) {
    margin: 0;
  }
`

const StyledSelectRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
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

const StyledButton = styled(PrimaryButton)`
  padding: 0.75rem;
  height: 80%;
  width: 100%;
  margin-top: 0.75rem;
`

const SearchTrip = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    console.log('test')
  }

  return (
    <Modal>
      <StyledForm aria-label='Search form' onSubmit={handleSubmit}>
        <StyledTextRow>
          <CloseButton onClick={() => setShowModal(false)} />
        </StyledTextRow>
        <StyledTextRow>
          <Label htmlFor='from'>From</Label>
          <StyledInput type='text' id='from' placeholder='Enter start location...'></StyledInput>
        </StyledTextRow>
        <StyledTextRow>
          <Label htmlFor='to'>To</Label>
          <StyledInput type='text' id='to' placeholder='Enter destination...'></StyledInput>
        </StyledTextRow>
        <StyledSelectRow>
          <StyledSelectColumn>
            <Label htmlFor='date'>Date</Label>
            <StyledInput type='date' id='date'></StyledInput>
          </StyledSelectColumn>
          <StyledSelectColumn>
            <Label htmlFor='time'>Time</Label>
            <StyledInput type='time' id='time'></StyledInput>
          </StyledSelectColumn> 
        </StyledSelectRow>
        <StyledSelectRow>
          <StyledSelectColumn>
            <Label htmlFor='seats'>Seats</Label>
            <StyledInput type='number' id='seats' min='0' max='4'></StyledInput>
          </StyledSelectColumn>
          <StyledSelectColumn>
            <Label htmlFor='price'>Price</Label>
            <StyledInput type='number' id='price' min='0' max='1000'></StyledInput>
          </StyledSelectColumn>
        </StyledSelectRow>
        <StyledSelectRow>
          <StyledButton type='submit'>Search</StyledButton>
        </StyledSelectRow>
      </StyledForm>
    </Modal>
  )
}

export default SearchTrip

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { PrimaryButton, InactiveButton } from '../UI'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 5rem;
`

const PrevButton = styled(InactiveButton)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 0.5rem 0.5rem;
`

const MiddleButton = styled(InactiveButton)`
  border-radius: 0;
  padding: 0.5rem 0.5rem;
`

const ActiveButton = styled(PrimaryButton)`
  border-radius: 0;
  padding: 0.5rem 0.5rem;
`

const NextButton = styled(InactiveButton)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 0.5rem 0.5rem;
`

const Pagination = ({ numberOfPages, page, setPage }) => {
  const createButtonArray = () => {
    const array = []

    for (let i = 0; i < numberOfPages; i++) {
      if (i === page) {
        array.push(
          <ActiveButton key={i}>
            {i + 1}
          </ActiveButton>
        )
      } else {
        array.push(
          <MiddleButton key={i}>
            {i + 1}
          </MiddleButton>
        )
      }
    }

    return array
  }
  return (
    <Container>
      <PrevButton>‹</PrevButton>
      {createButtonArray()}
      <NextButton>›</NextButton>
    </Container>
  )
}

Pagination.propTypes = {
  numberOfPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired
}

export default Pagination
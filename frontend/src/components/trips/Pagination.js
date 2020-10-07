import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { PrimaryButton, InactiveButton } from "../UI";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 5rem;
`;

const PrevButton = styled(InactiveButton)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  padding: 0.5rem 0.5rem;
`;

const MiddleButton = styled(InactiveButton)`
  border-radius: 0;
  padding: 0.5rem 0.5rem;
`;

const ActiveButton = styled(PrimaryButton)`
  border-radius: 0;
  padding: 0.5rem 0.5rem;
`;

const NextButton = styled(InactiveButton)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 0.5rem 0.5rem;
`;

const Pagination = ({ numberOfPages, page, setPage }) => {
  const createButtonArray = () => {
    // Create array with numbers 1 2 ... n
    const array = Array.from({ length: numberOfPages }, (_, i) => i + 1);

    if (array.length < 8) {
      return array.map((num, index) => {
        if (num === page) {
          return <ActiveButton key={index}>{num}</ActiveButton>;
        } else {
          return <MiddleButton key={index}>{num}</MiddleButton>;
        }
      });
    }

    console.log(array.length)

    // Modify based on current page
    if (page < 5) {
      array.splice(5, array.length - 6, "...");
    } else if (page >= 5 && page < array.length - 3) {
      array.splice(1, page - 3, "...");
      array.splice(5, array.length - 6, "...");
    } else {
      array.splice(1, array.length - 6, "...");
    }

    return array.map((num, index) => {
      if (num === page) {
        return <ActiveButton key={index}>{num}</ActiveButton>;
      } else if (num === "...") {
        return <MiddleButton key={index}>...</MiddleButton>;
      } else {
        return <MiddleButton key={index}>{num}</MiddleButton>;
      }
    });
  };

  return (
    <Container>
      <PrevButton>‹</PrevButton>
      {createButtonArray()}
      <NextButton>›</NextButton>
    </Container>
  );
};

Pagination.propTypes = {
  numberOfPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default Pagination;

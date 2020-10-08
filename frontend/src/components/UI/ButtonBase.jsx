import styled from 'styled-components';

const ButtonBase = styled.button`
    appearance: none;
    border: none;
    outline: none;
    cursor: pointer;

    border-radius: 3px;
    padding: 0rem 3rem;

    font-family: Kufam, sans-serif;
    font-weight: 400;

    transition: all .2s ease-in-out;

    &:active {
        transform: scale(0.9);
    }
`;

export default ButtonBase;

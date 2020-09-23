import styled from 'styled-components';

const PrimaryButton = styled.button`
    appearance: none;
    border: none;
    outline: none;

    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 3px;
    padding: 0rem 3rem;

    font-family: Kufam, sans-serif;
    font-weight: 400;
    color: white;

    transition: all .2s ease-in-out;

    &:hover {
        background-color: #5745a3;
    }

    &:active {
        transform: scale(0.9);
    }
`;

export default PrimaryButton;

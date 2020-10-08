import styled from 'styled-components';
import ButtonBase from './ButtonBase';

const InactiveButton = styled(ButtonBase)`
    border: 1px;
    border-color: ${(props) => props.theme.colors.inactive};
    border-style: solid;
    border-radius: 3px;
    background: none;

    color: ${(props) => props.theme.colors.inactive};

    &:hover {
        color: white;
    }
`;

export default InactiveButton;

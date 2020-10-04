import styled from 'styled-components';
import ButtonBase from './ButtonBase';

const PrimaryButton = styled(ButtonBase)`
    background-color: ${(props) => props.theme.colors.primary};
    color: white;

    &:hover {
        background-color: #5745a3;
    }
`;

export default PrimaryButton;

import styled from 'styled-components';

/**
 * @param {*} Field is any input/field component. For example HTML's input field or third-party.
 */
const FieldFactory = (Field) => styled(Field)`
    // Remove default field styling
    background: none;
    outline: none;
    border: 1px;
    border-color: ${(props) => props.theme.colors.inactive};
    border-style: solid;
    border-radius: 5px;
    padding: 0.5rem;
    font-family: Kufam, sans-serif;
    font-weight: 400;
    color: #707386;
    transition: color 0.2s, border-color 0.2s;
    &:hover {
        color: white;
    }

    &.field-error {
        border-color: #8c4c4c;
    }
`;

export default FieldFactory;

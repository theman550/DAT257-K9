import styled from 'styled-components';

const P = styled.p`
    font-family: Kufam, sans-serif;
    font-weight: 400;
    color: ${(props) => props.theme.colors.alternateFill};

    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;

    & > span {
        display: block;
    }
`;

const Label = styled.label`
    font-family: Kufam, sans-serif;
    font-weight: 400;
    font-size: 0.8em;
    color: ${(props) => props.theme.colors.inactive};
`;

const H2 = styled.h2`
    font-family: Kufam, sans-serif;
    font-weight: 600;
    font-size: 1.2em;
    color: ${(props) => props.theme.colors.alternateFill};

    // Give h2 more weight by allowing default margin-block-end
    margin-block-start: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;

    & > span {
        display: block;
    }
`;

// Does not work. withComponent erases H2's inherited styles
/* const H3 = styled(H2)`
    font-weight: 500;
`.withComponent('h3'); */

const H3 = styled.h3`
    font-family: Kufam, sans-serif;
    font-weight: 400;
    font-size: 1em;
    color: ${(props) => props.theme.colors.alternateFill};

    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;

    & > span {
        display: block;
    }
`;

const H4 = styled.h4`
    font-family: Kufam, sans-serif;
    font-weight: 400;
    color: ${(props) => props.theme.colors.inactive};
    font-size: 0.8em;

    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;

    & > span {
        display: block;
    }
`;

export {
  P,
  Label,
  H2,
  H3,
  H4,
};

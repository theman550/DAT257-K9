import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Meh } from 'react-feather';
import { H2, H3 } from './UI/Typography';

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: ${(props) => props.theme.padding.section};

    *:not(:last-child) {
        margin-bottom: ${(props) => props.theme.spacing.subsection};
    }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error) {
    console.log('componentDidCatch', error);
    // Display fallback UI
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children, sectionName } = this.props;

    if (hasError) {
      return (
        <MessageContainer>
          <Meh color="white" size={48} />
          <H2>
            Something went wrong.
          </H2>
          <H3>
            Cannot render
            {' '}
            {sectionName.toLowerCase()}
            , try reloading the page.
          </H3>
        </MessageContainer>
      );
    }

    // If there is no error, display the section's children as usual
    return children;
  }
}

ErrorBoundary.propTypes = {
  sectionName: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

ErrorBoundary.defaultProps = {
  children: [],
};

export default ErrorBoundary;

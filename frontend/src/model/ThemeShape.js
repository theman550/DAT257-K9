import PropTypes from 'prop-types';

/**
 * The app's theme shape is useful as a prop type whenever you
 * export your component with styled-component's 'withTheme'.
 * By doing so, you gain access to a theme prop, hence why
 * you would need to define its prop type.
 */
export default PropTypes.shape({
  colors: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired,
    fill: PropTypes.string.isRequired,
    alternateFill: PropTypes.string.isRequired,
    inactive: PropTypes.string.isRequired,

    gradient: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
  }),

  padding: PropTypes.shape({
    section: PropTypes.string.isRequired,
    sectionAccent: PropTypes.string.isRequired,
  }),

  spacing: PropTypes.shape({
    vNeighbor: PropTypes.string.isRequired,
    hNeighbor: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    subsection: PropTypes.string.isRequired,
    section: PropTypes.string.isRequired,
  }),

  size: PropTypes.shape({
    navbar: PropTypes.string.isRequired,
    corner: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
  }),
});

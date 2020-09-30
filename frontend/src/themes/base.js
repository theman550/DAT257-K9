/**
 * Access like this:
 * const MyFancyButton = styled.button`
 * background: ${props => props.theme.colors.primary}
 * `
 *
 * The constants are not required to be used everywhere in your design.
 * They're suppose to be "standard", it should be considered your "go-to".
 * To add additional "weight" to a design element, feel free to break them.
 * Add to them if you have come up with a contribution.
 *
 * The padding and spacing constants are named after primary uses.
 * For example, if you have multiple sections, say cards, on a page
 * it is recommended that you add spacing equivalent to 'spacing->section'.
 * They're named after usecases, as spacing-1, spacing-2, spacing-3, doesn't
 * add much value to the designer.
 */
const theme = {
  colors: {
    primary: '#8064f7',
    secondary: '#f5ba9c',
    fill: '#1a1a1a',
    alternateFill: '#f0ebff',
    inactive: '#707386',
  },

  padding: {
    section: '1rem 1rem',
    // Variation of section's standard padding, mainly to add variety
    sectionAccent: '1.5rem 2rem',
  },

  // How you apply spacing is up to you. Choose between margin-top, margin-right,
  // margin-bottom, margin-left, margin, etc.
  spacing: {
    // Neighbors are often elements that are tightly related
    // For example, a driver's rating and their car model
    vNeighbor: '0.25rem',
    hNeighbor: '0.25rem',
    // Header is a header's default margin. Often applied to margin-bottom.
    header: '0.83rem',
    // Subsection is spacing within a section between its inner components
    subsection: '1rem',
    // Section is spacing between completely different components
    section: '2rem',
  },
};

export default theme;

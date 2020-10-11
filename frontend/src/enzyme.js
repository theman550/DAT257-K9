/**
 * Enzyme is an additional testing utility for React and other test libraries.
 * It's required in certain cases to do specific assertions, one example
 * is to force a component to throw an error within its render lifecycle method(simulateError).
 * Read more about Enzyme: https://enzymejs.github.io/enzyme/
 */
/* eslint-disable */
import Enzyme, {
  configure,
  shallow,
  mount,
  render,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
/* eslint-enable */

configure({ adapter: new Adapter() });
export { shallow, mount, render };
export default Enzyme;

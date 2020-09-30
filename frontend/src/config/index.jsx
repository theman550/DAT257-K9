import _ from 'lodash';
import configs from './configs';

const defaultConfig = configs.development;
const environment = process.env.REACT_APP_ENV || 'development';
const environmentConfig = configs[environment];

// The default environment is set to development which means that other environments
// can override the default values which is established for the development configuration
// Lodash is used to merge nested properties
const finalConfig = _.merge({}, defaultConfig, environmentConfig);

console.log('Exporting config', finalConfig);
export default finalConfig;

/**
 * Define global variables. If the variable is constant between
 * environments define it under "development" as it's standard.
 * If it changes, define it under multiple environments.
 */
export default {
  development: {
    api: {
      url: 'http://spilg.xyz/api/',
    },
  },
  testing: {
    api: {
      url: 'http://spilg.xyz/api/',
    },
  },
  production: {
    api: {
      url: 'http://spilg.xyz/api/',
    },
  },
};

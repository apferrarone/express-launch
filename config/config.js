//                   __ _
//   ___ ___  _ __  / _(_) __ _
//  / __/ _ \| '_ \| |_| |/ _` |
// | (_| (_) | | | |  _| | (_| |
//  \___\___/|_| |_|_| |_|\__, |
//                         |___/

const debug = require('debug')('app:config');

// Don't want to use .env files in production:
if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development') {
  console.log(require('dotenv').config({ silent: true }));
}

console.log('NODE_ENV: ', process.env.NODE_ENV);

const config = {
  name: 'Config 1',
  // add other properties (env vars) like connection strings, secrets, etc
}

/**
 * Ensures all keys of a particular configuration have a value
 */
function configure(configuration) {
  for (var key in configuration) {
    let value = configuration[key];
    // if it's missing, bail:
    if (!value) {
      let error = new Error(`Could not configure ${configuration.name}. Missing value for ${key}`);
      debug(error);
      throw error;
    }
  }
  return configuration;
}

// Export all configurations
exports.config = configure(config);

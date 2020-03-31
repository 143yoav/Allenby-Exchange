const Configstore = require('configstore');
const packageJson = require('../package.json');

const config = new Configstore(packageJson.name, {
  currency: require('./currency.json'),
  db: require('./db.json'),
  cliCES: require('./cliCES.json')
});

module.exports = config;

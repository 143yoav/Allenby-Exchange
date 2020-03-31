const currencyService = require('../services/currency');

const actions = {
  convert: async ({ amount, sc, dc }) =>
    currencyService.convert(amount, sc, dc),
  loan: async ({ amount, sc }) => currencyService.loan(amount, sc),
  'end-loan': async ({ reserved, dc }) =>
    currencyService['end-loan'](reserved, dc)
};

module.exports = actions;

const axios = require('axios');
const { CurrencyServiceApi } = require('../../config/config').all.currency;

const exchange = async ({ from, to }) => {
  try {
    return await axios.get(CurrencyServiceApi, {
      params: {
        base: from.toUpperCase(),
        symbols: to.toUpperCase()
      }
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { exchange };

const axios = require('axios');
const config = require('../../config/currency.json');

const exchange = async query => {
  try {
    return await axios.get(config.CurrencyServiceApi, {
      params: {
        access_key: config.CurrencyServiceKey,
        query
      }
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { exchange };

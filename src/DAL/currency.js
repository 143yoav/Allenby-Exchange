const axios = require('axios');
const {
  CurrencyServiceApi,
  CurrencyServiceKey
} = require('../../config/config').all.currency;

const exchange = async query => {
  try {
    return await axios.get(CurrencyServiceApi, {
      params: {
        access_key: CurrencyServiceKey,
        query
      }
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { exchange };

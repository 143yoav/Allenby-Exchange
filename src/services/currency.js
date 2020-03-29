const { exchange } = require('../DAL/currency');
const { formatQuery, formatConverted } = require('../formatters/currency');
const receipt = require('../utils/receipt');

const convert = async (amount, from, to = 'ils') => {
  try {
    const query = formatQuery(amount, from, to);
    //const result = await exchange(query);
    //const converted = formatConverted(result.data);
    const converted = 360.5;
    return receipt.generate('convert', { converted, amount, from, to });
  } catch (error) {
    throw new Error('could not perform conversion');
  }
};

module.exports = { convert };

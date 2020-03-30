const db = require('../DAL/db');
const receipt = require('../utils/receipt');
const { exchange } = require('../DAL/currency');
const {
  formatQuery,
  formatConverted,
  formatLoan
} = require('../formatters/currency');
const config = require('../../config/config');

const handleConvert = async (amount, from, to = 'ils') => {
  try {
    //const converted = await convert(amount, from, to);
    const converted = 360.5;
    return receipt.generate('convert', { converted, amount, from, to });
  } catch (error) {
    throw new Error('could not perform conversion');
  }
};

const convert = async (amount, from, to) => {
  const query = formatQuery(amount, from, to);
  const result = await exchange(query);
  return formatConverted(result.data);
};

const handleLoan = async (amount, currency) => {
  try {
    db.loans.sync();
    const loan = formatLoan(amount, currency);
    loan.id = (await db.loans.create(loan)).id;
    return receipt.generate('loan', loan);
  } catch (error) {
    throw new Error('could not perform loan');
  }
};

const handleEndLoan = async (id, currency) => {
  try {
    db.loans.sync();
    const loan = (await db.loans.findAll({ where: { id } }))[0];

    loan.paidAmount =
      currency.toUpperCase() == loan.currency
        ? loan.amount
        : await convert(loan.amount, loan.currency, currency);
    loan.paid = currency;

    return receipt.generate('end-loan', loan);
  } catch (error) {
    throw new Error('could not perform end-loan');
  }
};

const handleConfig = async (field, value) => {
  try {
    config.set(`currency.${field}`, parseFloat(value));
    return receipt.generate('config', { field, value });
  } catch (error) {
    throw new Error('could not perform configuration');
  }
};

module.exports = {
  convert: handleConvert,
  loan: handleLoan,
  'end-loan': handleEndLoan,
  config: handleConfig
};

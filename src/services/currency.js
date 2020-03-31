const db = require('../DAL/db');
const { exchange } = require('../DAL/currency');
const {
  formatQuery,
  formatConverted,
  formatLoan
} = require('../formatters/currency');
const config = require('../../config/config');

const handleConvert = async (amount, from, to = 'ils') => {
  try {
    return await convert(amount, from, to);
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
    return loan;
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

    return loan;
  } catch (error) {
    throw new Error('could not perform end-loan');
  }
};

const handleConfig = async (field, value) => {
  try {
    config.set(`currency.${field}`, parseFloat(value));
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

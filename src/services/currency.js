const db = require('../DAL/db');
const { exchange } = require('../DAL/currency');
const { formatConverted, formatLoan } = require('../formatters/currency');
const config = require('../../config/config');

const handleConvert = async (amount, from, to = 'ils') => {
  try {
    const converted = await convert(amount, from, to);
    return { converted, amount, from, to };
  } catch (error) {
    throw new Error('could not perform conversion');
  }
};

const convert = async (amount, from, to) => {
  const rate = await exchange({ from, to });
  return parseFloat(amount) * formatConverted(rate.data);
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
    return { field, value };
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

const moment = require('moment');
const config = require('../../config/config');

const formatQuery = (amount, from, to) => `${amount} ${from} to ${to}`;

const formatConverted = data => data.answer_box.answers[0].converted.value;

const formatLoan = (amount, currency) => ({
  amount: parseFloat(amount),
  currency: currency.toUpperCase(),
  base: config.get('currency.base-commission'),
  daily: config.get('currency.daily-commission'),
  date: moment().format('YYYY-MM-DD')
});

module.exports = {
  formatQuery,
  formatConverted,
  formatLoan
};

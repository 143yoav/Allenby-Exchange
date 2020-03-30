const moment = require('moment');
const {
  commissionPercent,
  dailyCommissionPercent
} = require('../../config/currency.json');

const formatQuery = (amount, from, to) => `${amount} ${from} to ${to}`;

const formatConverted = data => data.answer_box.answers[0].converted.value;

const formatLoan = (amount, currency) => ({
  amount: parseFloat(amount),
  currency: currency.toUpperCase(),
  base: commissionPercent,
  daily: dailyCommissionPercent,
  date: moment().format('YYYY-MM-DD')
});

module.exports = {
  formatQuery,
  formatConverted,
  formatLoan
};

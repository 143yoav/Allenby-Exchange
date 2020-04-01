const moment = require('moment');
const config = require('../../config/config');

const formatConverted = ({ rates }) => rates[Object.keys(rates)[0]];

const formatLoan = (amount, currency) => ({
  amount: parseFloat(amount),
  currency: currency.toUpperCase(),
  base: config.get('currency.base-commission'),
  daily: config.get('currency.daily-commission'),
  date: moment().format('YYYY-MM-DD')
});

module.exports = {
  formatConverted,
  formatLoan
};

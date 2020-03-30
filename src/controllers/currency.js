const currencyService = require('../services/currency');

const convert = async (req, res) => {
  try {
    const { amount, from, to } = req.query;
    const receipt = await currencyService.convert(amount, from, to);
    res.status(200).send(receipt);
  } catch (error) {
    res.status(500).send();
  }
};

const loan = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const receipt = await currencyService.loan(amount, currency);
    res.status(200).send(receipt);
  } catch (error) {
    res.status(500).send();
  }
};

const endLoan = async (req, res) => {
  try {
    const { id, currency } = req.body;
    const receipt = await currencyService['end-loan'](id, currency);
    res.status(200).send(receipt);
  } catch (error) {
    res.status(500).send();
  }
};

const config = async (req, res) => {
  try {
    const { field, value } = req.body;
    const receipt = await currencyService.config(field, value);
    res.status(200).send(receipt);
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = { convert, loan, endLoan, config };

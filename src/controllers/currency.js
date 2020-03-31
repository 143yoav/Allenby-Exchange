const currencyService = require('../services/currency');
const receiptService = require('../services/receipt');

const convert = async (req, res) => {
  try {
    const { amount, from, to = 'ils' } = req.query;
    const converted = await currencyService.convert(amount, from, to);
    const receipt = receiptService.generate('convert', {
      ...req.body,
      converted
    });

    res.status(200).send(receipt);
  } catch (error) {
    res.status(500).send();
  }
};

const loan = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const loan = await currencyService.loan(amount, currency);
    const receipt = receiptService.generate('loan', loan);
    res.status(200).send(receipt);
  } catch (error) {
    res.status(500).send();
  }
};

const endLoan = async (req, res) => {
  try {
    const { id, currency } = req.body;
    const loan = await currencyService['end-loan'](id, currency);
    const receipt = receiptService.generate('end-loan', loan);
    res.status(200).send(receipt);
  } catch (error) {
    res.status(500).send();
  }
};

const config = async (req, res) => {
  try {
    const { field, value } = req.body;
    await currencyService.config(field, value);
    const receipt = receiptService.generate('config', { field, value });
    res.status(200).send(receipt);
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = { convert, loan, endLoan, config };

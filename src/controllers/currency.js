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

module.exports = { convert };

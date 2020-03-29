const {
  commissionPercent,
  dailyCommissionPercent
} = require('../../config/currency.json');

const createConvertReceipt = data =>
  `
Convert details: 
        From Amount: ${data.amount} 
        From Currency: ${data.from} 
        To Currency: ${data.to} 
        Commission: ${commissionPercent}%
        Amount Before Commission: ${data.converted}
        Amount: ${((1 - commissionPercent / 100) * data.converted).toFixed(2)}
`;

const receipts = {
  convert: createConvertReceipt
};

const generate = (action, data) => receipts[action](data);

module.exports = { generate };

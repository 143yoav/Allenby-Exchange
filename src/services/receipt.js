const moment = require('moment');
const config = require('../../config/config');

const createConvertReceipt = data =>
  `
Convert details: 
        From Amount: ${data.amount} 
        From Currency: ${data.from.toUpperCase()} 
        To Currency: ${data.to.toUpperCase()} 
        Commission: ${config.get('currency.base-commission')}%
        Amount Before Commission: ${data.converted}
        Amount: ${subCommission(
          data.converted,
          config.get('currency.base-commission')
        )}
`;

const createLoanReceipt = data =>
  `
Loan details: 
        Loan Amount: ${data.amount} 
        Loan Currency: ${data.currency.toUpperCase()} 
        Base Commission: ${data.base}% 
        Daily Commission: ${data.daily}% 
        Loan Start: ${data.date}
        Loan ID: ${data.id}
`;

const createEndLoanReceipt = data =>
  `
Loan end: 
        Paid Currency: ${data.paid.toUpperCase()} 
        Total Commission: ${calcTotalCommission(data)}% 
        Paid Amount Before Commission: ${data.paidAmount}
        Paid Amount: ${subCommission(
          data.paidAmount,
          calcTotalCommission(data)
        )}
        Loan End: ${moment().format('YYYY-MM-DD')}
` + createLoanReceipt(data);

const createConfigReceipt = ({ field, value }) =>
  `
${field} changed to: ${value}%
`;

const subCommission = (amount, commission) =>
  Math.max(((1 - commission / 100) * amount).toFixed(2), 0);

const calcTotalCommission = ({ base, daily, date }) =>
  Math.min(base + daily * moment().diff(date, 'days'), 100);

const receipts = {
  convert: createConvertReceipt,
  loan: createLoanReceipt,
  'end-loan': createEndLoanReceipt,
  config: createConfigReceipt
};

const generate = (action, data) => receipts[action](data);

module.exports = { generate };

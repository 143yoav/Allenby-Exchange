const moment = require('moment');
const {
  commissionPercent,
  dailyCommissionPercent
} = require('../../config/currency.json');

const createConvertReceipt = data =>
  `
Convert details: 
        From Amount: ${data.amount} 
        From Currency: ${data.from.toUpperCase()} 
        To Currency: ${data.to.toUpperCase()} 
        Commission: ${commissionPercent}%
        Amount Before Commission: ${data.converted}
        Amount: ${subCommission(data.converted, commissionPercent)}
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

const subCommission = (amount, commission) =>
  ((1 - commission / 100) * amount).toFixed(2);

const calcTotalCommission = ({ base, daily, date }) =>
  base + daily * moment().diff(date, 'days');

const receipts = {
  convert: createConvertReceipt,
  loan: createLoanReceipt,
  'end-loan': createEndLoanReceipt
};

const generate = (action, data) => receipts[action](data);

module.exports = { generate };

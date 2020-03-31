#!/usr/bin/env node
const currencyService = require('./src/services/currency');
const receiptService = require('./src/services/receipt');

const run = async () => {
  try {
    if (process.argv.length == 2) {
      throw new Error('allenby-exchange <action> <params>');
    }
    const action = process.argv[2];
    const params = process.argv.slice(3, process.argv.length);
    const result = await currencyService[action].apply(null, params);
    console.log(receiptService.generate(action, result));
  } catch (error) {
    console.log(error.message);
  }
};

run();

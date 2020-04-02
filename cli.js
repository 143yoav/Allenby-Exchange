#!/usr/bin/env node
const currencyService = require('./src/services/currency');
const receiptService = require('./src/services/receipt');

const run = async args => {
  try {
    if (args.length == 2) {
      throw new Error('allenby-exchange <action> <params>');
    }
    const action = args[2];
    const params = args.slice(3, args.length);
    const result = await currencyService[action].apply(null, params);
    console.log(receiptService.generate(action, result));
  } catch (error) {
    console.log(error.message);
  }
};

run(process.argv);

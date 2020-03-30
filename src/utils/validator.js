const Validator = require('validatorjs');
const validator = (source, rules, callback) => {
  const validation = new Validator(source, rules);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors.errors, false));
};

module.exports = validator;

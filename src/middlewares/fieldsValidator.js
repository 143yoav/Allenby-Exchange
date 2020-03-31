const validator = require('../utils/validator');

module.exports = fields => (req, res, next) => {
  const source = req.method == 'GET' ? req.query : req.body;

  const rules = fields.reduce(
    (obj, item) => ({
      ...obj,
      [item]: 'required'
    }),
    {}
  );

  validator(source, rules, (err, status) => {
    status ? next() : res.status(400).send(err);
  });
};

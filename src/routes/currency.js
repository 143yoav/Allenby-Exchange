const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currency');
const fieldsValidator = require('../middlewares/fieldsValidator');

router.get(
  '/convert',
  fieldsValidator(['amount', 'from', 'to']),
  currencyController.convert
);

router.post(
  '/loan',
  fieldsValidator(['amount', 'currency']),
  currencyController.loan
);

router.post(
  '/end-loan',
  fieldsValidator(['id', 'currency']),
  currencyController.endLoan
);

router.post(
  '/config',
  fieldsValidator(['field', 'value']),
  currencyController.config
);

module.exports = router;

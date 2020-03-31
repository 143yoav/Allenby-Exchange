const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currency');
const fieldsValidator = require('../middlewares/fieldsValidator');
const permissions = require('../middlewares/permissions');

router.get(
  '/convert',
  permissions,
  fieldsValidator(['amount', 'from']),
  currencyController.convert
);

router.post(
  '/loan',
  permissions,
  fieldsValidator(['amount', 'currency']),
  currencyController.loan
);

router.post(
  '/end-loan',
  permissions,
  fieldsValidator(['id', 'currency']),
  currencyController.endLoan
);

router.post(
  '/config',
  permissions,
  fieldsValidator(['field', 'value']),
  currencyController.config
);

module.exports = router;

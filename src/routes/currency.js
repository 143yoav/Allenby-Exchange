const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currency');
const fieldsValidator = require('../middlewares/fieldsValidator');

router.get(
  '/convert',
  fieldsValidator(['amount', 'from', 'to']),
  currencyController.convert
);



module.exports = router;

const express = require('express');
const router = express.Router();
const cmdController = require('../controllers/cmd');
const fieldsValidator = require('../middlewares/fieldsValidator');
const permissions = require('../middlewares/permissions');

router.get('/', permissions, fieldsValidator(['cmd']), cmdController.execute);

module.exports = router;

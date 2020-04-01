const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const fieldsValidator = require('../middlewares/fieldsValidator');

router.get('/', fieldsValidator(['access_token']), authController.verifyToken);

module.exports = router;

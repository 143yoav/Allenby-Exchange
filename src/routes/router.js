const router = require('express').Router();

router.use('/currency', require('./currency'));
router.use('/cmd', require('./cmd'));
router.use('/auth', require('./auth'));

module.exports = router;

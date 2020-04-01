const router = require('express').Router();

router.use('/currency', require('./currency'));
router.use('/cmd', require('./cmd'));

module.exports = router;

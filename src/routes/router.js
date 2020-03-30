const router = require('express').Router();

router.use('/currency', require('./currency'));

module.exports = router;

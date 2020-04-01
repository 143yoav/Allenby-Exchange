const jwt = require('jsonwebtoken');
const config = require('../../config/config');

module.exports = (req, res, next) => {
  try {
    const { client_id } = jwt.verify(
      req.headers.token,
      config.get('permissions.secret')
    );

    if (client_id < config.get(`permissions.${req.path.substring(1)}`)) {
      res.status(401).send('Unauthorized request');
    } else {
      next();
    }
  } catch (error) {
    res.status(401).send('Unauthorized request');
  }
};

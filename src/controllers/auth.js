const authService = require('../services/auth');

const verifyToken = async (req, res) => {
  try {
    const { access_token } = req.query;
    const result = await authService.verify(access_token);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send();
  }
};

module.exports = { verifyToken };

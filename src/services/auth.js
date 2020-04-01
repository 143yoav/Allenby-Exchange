const axios = require('axios');
const jwt = require('jsonwebtoken');
const {
  googleTokenURL,
  secret,
  expiresIn
} = require('../../config/config').all.permissions;

const verify = async access_token => {
  try {
    const res = await axios.get(googleTokenURL, {
      params: {
        access_token
      }
    });

    if (res.data.access_type == 'online') {
      return jwt.sign({ client_id: 2 }, secret, { expiresIn });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { verify };

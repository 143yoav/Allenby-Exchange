const axios = require('axios');
const { apiURL } = require('./config/config').all.cliCES;

const actions = {
  convert: {
    method: 'get',
    location: 'params',
    fields: ['amount', 'from', 'to']
  },
  loan: {
    method: 'post',
    location: 'data',
    fields: ['amount', 'currency']
  },
  'end-loan': {
    method: 'post',
    location: 'data',
    fields: ['id', 'currency']
  },
  config: {
    method: 'post',
    location: 'data',
    fields: ['field', 'value']
  }
};

const run = async () => {
  try {
    const action = actions[process.argv[2]];
    const params = process.argv.slice(3, process.argv.length);

    if (!action) {
      throw new Error('action is undefined. pattern :<action> <params>');
    }

    const result = await axios({
      url: `${apiURL}${process.argv[2]}`,
      method: action.method,
      [action.location]: action.fields.reduce(
        (obj, field, index) => ({
          ...obj,
          [field]: params[index]
        }),
        {}
      )
    });
    console.log(result.data);
  } catch (error) {
    if (error.response) {
      console.log(JSON.stringify(error.response.data));
    } else {
      console.log(error.message);
    }
  }
};

run();

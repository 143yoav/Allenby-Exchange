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

const run = async args => {
  try {
    const action = actions[args[2]];
    const params = args.slice(3, args.length);

    if (!action) {
      throw new Error('action is undefined. pattern :<action> <params>');
    }

    const result = await axios({
      url: `${apiURL}${args[2]}`,
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

run(process.argv);

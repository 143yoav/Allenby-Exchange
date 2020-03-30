const axios = require('axios');

const actions = {
  convert: {
    method: 'get',
    location: 'params',
    variables: ['amount', 'from', 'to']
  },
  loan: {
    method: 'post',
    location: 'data',
    variables: ['amount', 'currency']
  },
  'end-loan': {
    method: 'post',
    location: 'data',
    variables: ['id', 'currency']
  },
  config: {
    method: 'post',
    location: 'data',
    variables: ['field', 'value']
  }
};

const run = async () => {
  try {
    if (process.argv.length == 2) {
      throw new Error('<action> <params>');
    }

    const action = actions[process.argv[2]];
    const params = process.argv.slice(3, process.argv.length);

    const result = await axios({
      url: `http://localhost:3002/api/currency/${process.argv[2]}`,
      method: action.method,
      [action.location]: action.variables.reduce(
        (obj, variable, index) => ({
          ...obj,
          [variable]: params[index]
        }),
        {}
      )
    });

    console.log(result.data);
  } catch (error) {
    console.log(error.message);
  }
};

run();

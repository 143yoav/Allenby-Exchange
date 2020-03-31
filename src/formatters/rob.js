const { hexArrToNum, numToHexArr } = require('../utils/converter');
const config = require('../../config/config').all.customeProtocols;

const serialize = ({ success, id, base, daily, amount }) =>
  Buffer.from(
    [config.success.indexOf(success), id, base, daily].concat(
      numToHexArr(amount)
    )
  );

const deserialize = buffer => ({
  cmd: config.actions[buffer[0]],
  sc: config.currency[buffer[1]],
  dc: config.currency[buffer[2]],
  reserved: buffer[3],
  amount: hexArrToNum(buffer.slice(4))
});

module.exports = {
  serialize,
  deserialize
};

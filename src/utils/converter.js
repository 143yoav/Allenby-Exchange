const hexArrToNum = arr =>
  parseInt(
    arr.reduce((pre, cur) => pre + cur.toString(16), ''),
    16
  );

const numToHexArr = num => strToHexArr(padZero(num ? num.toString(16) : '0'));

const padZero = str => {
  while (str.length < 8) {
    str = '0' + str;
  }
  return str;
};

const strToHexArr = hex =>
  hex.match(/[\da-f]{2}/gi).map(function(h) {
    return parseInt(h, 16);
  });

module.exports = { hexArrToNum, numToHexArr };

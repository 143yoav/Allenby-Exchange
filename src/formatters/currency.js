const formatQuery = (amount, from, to) => `${amount} ${from} to ${to}`;

const formatConverted = data => data.answer_box.answers[0].converted.value;

module.exports = {
  formatQuery,
  formatConverted
};

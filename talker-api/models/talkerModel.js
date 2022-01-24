const talker = require('../../talker.json');

const getAll = async () => {
  const result = await talker;
  return result;
};

module.exports = {
  getAll,
};

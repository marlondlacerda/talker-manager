const fs = require('fs').promises;

module.exports = async () => {
  const talker = await fs
    .readFile('./talker.json', 'utf-8')
    .then((response) => JSON.parse(response));

  return talker;
};

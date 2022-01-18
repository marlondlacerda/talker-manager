const fs = require('fs').promises;

module.exports = async (req, res) => {
  const talker = await fs
    .readFile('./talker.json', 'utf-8')
    .then((response) => JSON.parse(response));

  res.status(200).json(talker);
};
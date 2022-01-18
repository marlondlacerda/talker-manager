const fs = require('fs').promises;
const path = require('path');

module.exports = async (req, res) => {
  const talker = await fs
    .readFile(path.join(__dirname, '..', 'talker.json'), 'utf-8')
    .then(JSON.parse);

  res.status(200).json(talker);
};
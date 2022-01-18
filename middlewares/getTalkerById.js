const fs = require('fs').promises;

module.exports = async (req, res) => {
  const { id } = req.params;

  const talker = await fs
    .readFile('./talker.json', 'utf-8')
    .then((response) => JSON.parse(response));

  const talk = talker.find((t) => t.id === +id);

  if (!talk) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(talk);
};
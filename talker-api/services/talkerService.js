const readFile = require('../../helpers/readFile');
const updateFile = require('../../helpers/updateFile');
const writeFile = require('../../helpers/writeFile');

const getAll = async () => readFile();

const getById = async (id) => {
  const talkFile = await readFile();
  const result = talkFile.find((t) => t.id === +id);

  if (!result) {
    const error = {
      code: 'not_found',
      message: 'Pessoa palestrante não encontrada',
    };
    throw error;
  }

  return result;
};

const add = async (talker) => {
  await writeFile('./talker.json', talker);
};

const update = async (talker) => {
  const data = await readFile();
  const index = data.findIndex((t) => t.id === talker.id);
  data[index] = talker;

  await updateFile('./talker.json', data);
};

const remove = async (id) => {
  const data = await readFile();
  const index = data.findIndex((t) => t.id === +id);

  await data.splice(index, 1);
  await updateFile('./talker.json', data);
};

module.exports = { 
  getAll,
  getById,
  add,
  update,
  remove,
};

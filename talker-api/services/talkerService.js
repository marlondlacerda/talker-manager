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
  const talkFile = await readFile();
  const index = talkFile.findIndex((t) => t.id === talker.id);
  talkFile[index] = talker;

  await updateFile('./talker.json', talkFile);
};

const remove = async (id) => {
  const talkFile = await readFile();
  const index = talkFile.findIndex((t) => t.id === +id);

  await talkFile.splice(index, 1);
  await updateFile('./talker.json', talkFile);
};

const getTalk = async (name) => {
  const talkFile = await readFile();
  const person = talkFile.filter((t) => t.name.includes(name));

  return person;
};

module.exports = { 
  getAll,
  getById,
  add,
  update,
  remove,
  getTalk,
};

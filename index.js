const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const getTalker = require('./controllers/middlewares/getTalker');
const getTalkerById = require('./controllers/middlewares/getTalkerById');
const { isValidEmail, isValidPassword, isValidToken,
  isValidName, isValidAge, isValidadeTalk } = require('./controllers/middlewares/validations');
const token = require('./controllers/middlewares/generateTolken');
const writeFile = require('./controllers/writeFile');
const updateFile = require('./controllers/middlewares/updateFile');

app.get('/talker', getTalker);
app.get('/talker/:id', getTalkerById);

app.post('/login',
isValidEmail,
isValidPassword,
(_req, res) => res.status(200).json({ token: token() }));

app.post('/talker', 
  isValidToken, 
  isValidName, 
  isValidAge, 
  isValidadeTalk,
  async (req, res) => {
    try {
      const data = await fs
      .readFile('./talker.json', 'utf-8')
      .then((response) => JSON.parse(response));
      req.body.id = data.length + 1;
      await writeFile('./talker.json', req.body);
      return res.status(201).json(req.body);
    } catch (e) {
      console.log(e);
    }
  });

app.put('/talker/:id',
isValidToken, 
isValidName, 
isValidAge, 
isValidadeTalk,
async (req, res) => {
  try {
    const data = await fs
    .readFile('./talker.json', 'utf-8')
    .then((response) => JSON.parse(response));

    const index = data.findIndex((talker) => (talker.id) === parseInt(req.params.id, 10));
    req.body.id = parseInt(req.params.id, 10);
    data[index] = req.body;

    await updateFile('./talker.json', data);
    return res.status(200).json(req.body);
  } catch (e) {
    console.log(e);
  }
});

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.delete('/talker/:id',
isValidToken,
async (req, res) => {
  try {
    const data = await fs
    .readFile('./talker.json', 'utf-8')
    .then((response) => JSON.parse(response));

    const index = data.findIndex((talker) => (talker.id) === parseInt(req.params.id, 10));
    data.splice(index, 1);

    await updateFile('./talker.json', data);
    return res.status(204).json({ message: 'Deletado com sucesso' });
  } catch (e) {
    console.log(e);
  }
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

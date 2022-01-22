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

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

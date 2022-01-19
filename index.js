const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const getTalker = require('./middlewares/getTalker');
const getTalkerById = require('./middlewares/getTalkerById');
const { isValidEmail, isValidPassword } = require('./middlewares/validations');
const token = require('./middlewares/generateTolken');

app.get('/talker', getTalker);
app.get('/talker/:id', getTalkerById);
app.post('/login', isValidEmail, isValidPassword, (_req, res) => res.status(200).json({ token: token() }));

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

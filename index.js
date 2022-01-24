const express = require('express');
const bodyParser = require('body-parser');

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const middlewares = require('./talker-api/controllers/middlewares');
const talkerController = require('./talker-api/controllers/talkerController');
const loginController = require('./loginController/loginController');

const app = express();

app.use(bodyParser.json());

app.use('/talker', talkerController);
app.use('/login', loginController);

app.use(middlewares.domainError);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

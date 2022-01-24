const rescue = require('express-rescue');
const talker = require('express').Router();

const readFile = require('../../helpers/readFile');
const { isValidName, isValidAge, isValidTalk, isValidToken } = require('./middlewares/validations');
const talkerService = require('../services/talkerService');

talker.get(
  '/',
  rescue(async (req, res) => {
    const talk = await talkerService.getAll();

    res.status(200).json(talk);
  }),
);

talker.get(
  '/:id',
  rescue(async (req, res) => {
    const person = await talkerService.getById(req.params.id);

    res.status(200).json(person);
  }),
);

talker.post(
  '/',
  rescue(async (req, res) => {
    const { authorization } = req.headers;
    const { name, age, talk } = req.body;
    const talkFile = await readFile();

    isValidToken(authorization);
    isValidName(name);
    isValidAge(age);
    isValidTalk(talk);

    req.body.id = talkFile.length + 1;
    talkerService.add(req.body);

    res.status(201).json(req.body);
  }),
);

talker.put(
  '/:id',
  rescue(async (req, res) => {
    const { authorization } = req.headers;
    const { name, age, talk } = req.body;

    isValidToken(authorization);
    isValidName(name);
    isValidAge(age);
    isValidTalk(talk);

    req.body.id = +req.params.id;
    talkerService.update(req.body);

    res.status(200).json(req.body);
  }),
);

talker.delete(
  '/:id',
  rescue(async (req, res) => {
    const { authorization } = req.headers;
    const { id } = req.params;

    isValidToken(authorization);
    talkerService.remove(id);

    res.status(204).json({ message: 'Deletado com sucesso' });
  }),
);

// talker.get(
//   '/:id/search',
//   rescue(async (req, res) => {
//     const { authorization } = req.headers;
//     const { name } = req.query;

module.exports = talker;
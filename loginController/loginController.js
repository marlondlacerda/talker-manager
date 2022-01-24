const rescue = require('express-rescue');
const login = require('express').Router();

const token = require('../helpers/generateTolken.js');
const { isValidEmail, isValidPassword } = require(
  '../talker-api/controllers/middlewares/validations',
  );

login.post(
  '/',
  rescue(async (req, res) => {
    const { email, password } = req.body;

    isValidEmail(email);
    isValidPassword(password);

    return res.status(200).json({ token: token() });
  }),
);

module.exports = login;

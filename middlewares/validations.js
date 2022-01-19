const isValidEmail = (req, res, next) => {
  const { email } = req.body;

  if (
    !email 
    ) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (
    !email.includes('@') 
    || !email.includes('.com')
  ) return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });

  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
}

  next();
};

const isValidToken = (req, res, next) => {
  const { authorization } = req.headers;

  const tokenRegex = /^[a-zA-Z0-9]{16}$/;
  const verification = tokenRegex.test(authorization);

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
  if (!verification) return res.status(401).json({ message: 'Token inválido' });

  next();
};

const isValidName = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });

  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
    }
  next();
};

const isValidAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });

  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const isValidDate = (date) => {
  const tokenRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  return tokenRegex.test(date);
};

const isValidRate = (rate) => {
  if (rate < 1 || rate > 5) {
    return false;
  }
  return true;
};

const isValidadeTalk = (req, res, next) => {
  const { watchedAt, rate } = req.body.talk;

  if (!watchedAt || !rate) {
    return res
    .status(400)
    .json({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  if (!isValidDate(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (!isValidRate(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidName,
  isValidAge,
  isValidadeTalk,
};
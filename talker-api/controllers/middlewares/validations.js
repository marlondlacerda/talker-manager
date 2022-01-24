const tokenRegexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
const verifyTalk = (talk) => (!talk || !talk.watchedAt || (talk.rate !== 0 && !talk.rate));

const reportErrorParam = (param) => {
  // eslint-disable-next-line no-throw-literal
  throw {
    code: 'invalid_request',
    message: `O campo "${param}" é obrigatório`,
  };
};

const reportErrorLength = (param, caracter) => {
  // eslint-disable-next-line no-throw-literal
  throw {
    code: 'invalid_request',
    message: `O "${param}" deve ter pelo menos ${caracter} caracteres`,
  };
};

const isValidEmail = (email) => {
  if (!email) { 
    reportErrorParam('email');
  }

  if (
    !email.includes('@') 
    || !email.includes('.com')
  ) {
    // eslint-disable-next-line no-throw-literal
    throw {
      code: 'invalid_request',
      message: 'O "email" deve ter o formato "email@email.com"',
    };
  }
};

const isValidPassword = (password) => {
  if (!password) {
    reportErrorParam('password');
  }

  if (password.length < 6) {
    // eslint-disable-next-line no-throw-literal
    reportErrorLength('password', 6);
  }
};

const isValidToken = (authorization) => {
  const tokenRegex = /^[a-zA-Z0-9]{16}$/;
  const verification = tokenRegex.test(authorization);

  if (!authorization) {
    // eslint-disable-next-line no-throw-literal
    throw {
      code: 'unauthorized',
      message: 'Token não encontrado',
    };
  }

  if (!verification) {
    // eslint-disable-next-line no-throw-literal
    throw {
      code: 'unauthorized',
      message: 'Token inválido',
    };
  }
};

const isValidName = (name) => {
  if (!name) { 
    reportErrorParam('name');
  }

  if (name.length < 3) {
    reportErrorLength('name', 3);
  }
};

const isValidAge = (age) => {
  if (!age) { 
    reportErrorParam('age');
  }

  if (age < 18) {
    // eslint-disable-next-line no-throw-literal
    throw {
      code: 'invalid_request',
      message: 'A pessoa palestrante deve ser maior de idade',
    };
  }
};

const isValidDate = (date) => { 
  if (!tokenRegexDate.test(date)) {
    // eslint-disable-next-line no-throw-literal
    throw {
      code: 'invalid_request',
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    };
  }
};

const isValidRate = (rate) => { 
  if (((rate < 1 || rate > 5))) {
    // eslint-disable-next-line no-throw-literal
    throw {
      code: 'invalid_request',
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    };
  }
};

const isValidTalk = (talk) => {
  if (verifyTalk(talk)) {
    // eslint-disable-next-line no-throw-literal
    throw {
      code: 'invalid_request',
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
  }

  isValidDate(talk.watchedAt);
  isValidRate(talk.rate);
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
};
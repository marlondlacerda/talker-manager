module.exports = (err, req, res, next) => {
  const errorMap = {
    not_found: 404,
    invalid_request: 400,
    unauthorized: 401,
  };

  const status = errorMap[err.code];

  if (!status) {
    return next(err);
  }

  res.status(status).json(err);
};

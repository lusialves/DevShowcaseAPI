function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ message: 'Registro duplicado para um campo que deve ser único.' });
  }

  return res.status(err.status || 500).json({
    message: err.publicMessage || 'Erro interno do servidor.'
  });
}

module.exports = errorHandler;

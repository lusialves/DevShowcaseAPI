const { validationResult } = require('express-validator');

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Dados inválidos.',
      errors: errors.array().map(({ type, value, msg, path, location }) => ({
        type, value, msg, field: path, location
      }))
    });
  }
  next();
}

module.exports = validateRequest;

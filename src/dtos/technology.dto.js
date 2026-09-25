const { body } = require('express-validator');

const createTechnologyRules = [
  body('name')
    .trim().notEmpty().withMessage('Nome da tecnologia é obrigatório.')
    .isLength({ min: 1, max: 80 }).withMessage('Nome deve ter no máximo 80 caracteres.')
];

module.exports = { createTechnologyRules };

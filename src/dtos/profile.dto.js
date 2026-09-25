const { body, param } = require('express-validator');

const createProfileRules = [
  body('name')
    .trim().notEmpty().withMessage('Nome é obrigatório.')
    .isLength({ min: 2, max: 120 }).withMessage('Nome deve ter entre 2 e 120 caracteres.'),
  body('email')
    .trim().notEmpty().withMessage('E-mail é obrigatório.')
    .isEmail().withMessage('E-mail inválido.')
    .normalizeEmail(),
  body('bio')
    .optional({ nullable: true }).trim()
    .isLength({ max: 2000 }).withMessage('Bio deve ter no máximo 2000 caracteres.'),
  body('githubUrl')
    .optional({ nullable: true, checkFalsy: true })
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('githubUrl deve ser uma URL HTTP/HTTPS válida.'),
  body('linkedinUrl')
    .optional({ nullable: true, checkFalsy: true })
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('linkedinUrl deve ser uma URL HTTP/HTTPS válida.')
];

const getProfileByIdRules = [
  param('id').isInt({ min: 1 }).withMessage('ID do perfil deve ser um inteiro positivo.')
];

module.exports = { createProfileRules, getProfileByIdRules };

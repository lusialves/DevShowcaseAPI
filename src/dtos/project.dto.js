const { body } = require('express-validator');

const createProjectRules = [
  body('profileId')
    .isInt({ min: 1 }).withMessage('profileId deve ser um inteiro positivo.'),
  body('title')
    .trim().notEmpty().withMessage('Título é obrigatório.')
    .isLength({ min: 3, max: 150 }).withMessage('Título deve ter entre 3 e 150 caracteres.'),
  body('description')
    .optional({ nullable: true }).trim()
    .isLength({ max: 4000 }).withMessage('Descrição deve ter no máximo 4000 caracteres.'),
  body('repositoryUrl')
    .notEmpty().withMessage('URL do repositório é obrigatória.')
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('repositoryUrl deve ser uma URL HTTP/HTTPS válida.'),
  body('demoUrl')
    .optional({ nullable: true, checkFalsy: true })
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('demoUrl deve ser uma URL HTTP/HTTPS válida.'),
  body('technologyIds')
    .isArray({ min: 1 }).withMessage('technologyIds deve conter ao menos uma tecnologia.'),
  body('technologyIds.*')
    .isInt({ min: 1 }).withMessage('Cada technologyId deve ser um inteiro positivo.')
];

module.exports = { createProjectRules };

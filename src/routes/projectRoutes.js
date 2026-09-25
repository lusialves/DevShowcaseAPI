const express = require('express');
const controller = require('../controllers/projectController');
const validateRequest = require('../middlewares/validation');
const { createProjectRules } = require('../dtos/project.dto');

const router = express.Router();
router.post('/', createProjectRules, validateRequest, controller.create);
router.get('/', controller.list);
module.exports = router;

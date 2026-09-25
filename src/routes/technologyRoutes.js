const express = require('express');
const controller = require('../controllers/technologyController');
const validateRequest = require('../middlewares/validation');
const { createTechnologyRules } = require('../dtos/technology.dto');

const router = express.Router();
router.post('/', createTechnologyRules, validateRequest, controller.create);
router.get('/', controller.list);
module.exports = router;

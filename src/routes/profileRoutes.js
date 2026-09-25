const express = require('express');
const controller = require('../controllers/profileController');
const validateRequest = require('../middlewares/validation');
const { createProfileRules, getProfileByIdRules } = require('../dtos/profile.dto');

const router = express.Router();
router.post('/', createProfileRules, validateRequest, controller.create);
router.get('/:id', getProfileByIdRules, validateRequest, controller.getById);
module.exports = router;

const profileRepository = require('../repositories/profileRepository');

async function create(req, res, next) {
  try {
    const profile = await profileRepository.create(req.body);
    return res.status(201).json(profile);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const profile = await profileRepository.findById(Number(req.params.id));
    if (!profile) return res.status(404).json({ message: 'Perfil não encontrado.' });
    return res.json(profile);
  } catch (error) {
    next(error);
  }
}

module.exports = { create, getById };

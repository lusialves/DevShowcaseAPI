const technologyRepository = require('../repositories/technologyRepository');

async function create(req, res, next) {
  try {
    const technology = await technologyRepository.create(req.body);
    return res.status(201).json(technology);
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
  try {
    return res.json(await technologyRepository.findAll());
  } catch (error) {
    next(error);
  }
}

module.exports = { create, list };

const projectService = require('../services/projectService');

async function create(req, res, next) {
  try {
    const project = await projectService.createProject(req.body);
    return res.status(201).json(project);
  } catch (error) {
    next(error);
  }
}

async function list(req, res, next) {
  try {
    return res.json(await projectService.listProjects());
  } catch (error) {
    next(error);
  }
}

module.exports = { create, list };

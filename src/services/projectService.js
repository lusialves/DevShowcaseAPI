const profileRepository = require('../repositories/profileRepository');
const technologyRepository = require('../repositories/technologyRepository');
const projectRepository = require('../repositories/projectRepository');

async function createProject(data) {
  const profile = await profileRepository.findById(data.profileId);
  if (!profile) {
    const error = new Error('Perfil não encontrado.');
    error.status = 404;
    error.publicMessage = 'Perfil informado não existe.';
    throw error;
  }

  const uniqueTechnologyIds = [...new Set(data.technologyIds.map(Number))];
  const technologies = await technologyRepository.findByIds(uniqueTechnologyIds);
  if (technologies.length !== uniqueTechnologyIds.length) {
    const error = new Error('Tecnologia inexistente.');
    error.status = 400;
    error.publicMessage = 'Uma ou mais tecnologias informadas não existem.';
    throw error;
  }

  const id = await projectRepository.createWithTechnologies({
    ...data,
    technologyIds: uniqueTechnologyIds
  });
  return { id, ...data, technologyIds: uniqueTechnologyIds };
}

async function listProjects() {
  return projectRepository.findAll();
}

module.exports = { createProject, listProjects };

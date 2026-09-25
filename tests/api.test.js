const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const profileRepository = require('../src/repositories/profileRepository');
const technologyRepository = require('../src/repositories/technologyRepository');
const projectRepository = require('../src/repositories/projectRepository');

// Mocks simples para testar rotas/DTOs sem depender de um MySQL ativo.
profileRepository.create = async (data) => ({ id: 1, ...data, createdAt: new Date().toISOString() });
profileRepository.findById = async (id) => id === 1 ? ({ id: 1, name: 'Ana Dev', email: 'ana@example.com' }) : null;
technologyRepository.create = async (data) => ({ id: 1, ...data });
technologyRepository.findAll = async () => [{ id: 1, name: 'Node.js' }, { id: 2, name: 'MySQL' }];
technologyRepository.findByIds = async (ids) => ids.map((id) => ({ id, name: `Tech ${id}` }));
projectRepository.createWithTechnologies = async () => 10;
projectRepository.findAll = async () => [{ id: 10, title: 'Portfólio', technologies: [] }];

const app = require('../src/app');

test('GET /health retorna status ok', async () => {
  const res = await request(app).get('/health');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'ok');
});

test('POST /api/profiles cria perfil válido', async () => {
  const res = await request(app).post('/api/profiles').send({
    name: 'Ana Dev',
    email: 'ana@example.com',
    githubUrl: 'https://github.com/anadev'
  });
  assert.equal(res.status, 201);
  assert.equal(res.body.email, 'ana@example.com');
});

test('POST /api/profiles rejeita e-mail inválido', async () => {
  const res = await request(app).post('/api/profiles').send({ name: 'Ana Dev', email: 'email-invalido' });
  assert.equal(res.status, 400);
  assert.ok(Array.isArray(res.body.errors));
});

test('GET /api/profiles/:id retorna perfil existente', async () => {
  const res = await request(app).get('/api/profiles/1');
  assert.equal(res.status, 200);
  assert.equal(res.body.id, 1);
});

test('POST /api/technologies cria tecnologia válida', async () => {
  const res = await request(app).post('/api/technologies').send({ name: 'Node.js' });
  assert.equal(res.status, 201);
});

test('GET /api/technologies lista tecnologias', async () => {
  const res = await request(app).get('/api/technologies');
  assert.equal(res.status, 200);
  assert.equal(res.body.length, 2);
});

test('POST /api/projects cria projeto válido', async () => {
  const res = await request(app).post('/api/projects').send({
    profileId: 1,
    title: 'Meu Portfólio',
    description: 'Projeto acadêmico',
    repositoryUrl: 'https://github.com/grupo/projeto',
    demoUrl: 'https://example.com',
    technologyIds: [1, 2]
  });
  assert.equal(res.status, 201);
  assert.equal(res.body.id, 10);
});

test('POST /api/projects rejeita URL de repositório inválida', async () => {
  const res = await request(app).post('/api/projects').send({
    profileId: 1,
    title: 'Meu Portfólio',
    repositoryUrl: 'nao-e-url',
    technologyIds: [1]
  });
  assert.equal(res.status, 400);
});

test('GET /api/projects lista projetos', async () => {
  const res = await request(app).get('/api/projects');
  assert.equal(res.status, 200);
  assert.equal(res.body[0].id, 10);
});

# DevShowcase API

Projeto acadêmico da disciplina de desenvolvimento backend - UESPI (EAD/UAPPI), Polo Jerumenha.

A API modela perfis de desenvolvedores, projetos, tecnologias e feedbacks utilizando Node.js, Express e MySQL, com arquitetura em camadas, repositórios de persistência e validação de DTOs.

## Requisitos atendidos

- Stack: Node.js + Express + MySQL.
- Entidades: `Profile`, `Project`, `Technology` e `Feedback`.
- Relacionamentos:
  - Profile 1:N Project.
  - Project N:N Technology.
  - Project 1:N Feedback.
- Repositórios de persistência separados da camada HTTP.
- DTOs de entrada validados com `express-validator`.
- Endpoints exigidos:
  - `POST /api/profiles`
  - `GET /api/profiles/:id`
  - `POST /api/technologies`
  - `GET /api/technologies`
  - `POST /api/projects`
  - `GET /api/projects`
- Testes automatizados das rotas e validações com `node:test` + Supertest.
- Coleção Postman em `postman/DevShowcase.postman_collection.json`.

## Estrutura

```text
devshowcase-api/
├── database/
│   └── schema.sql
├── postman/
│   └── DevShowcase.postman_collection.json
├── src/
│   ├── config/
│   ├── controllers/
│   ├── dtos/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   └── server.js
├── tests/
│   └── api.test.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Banco de dados

1. Abra o MySQL Workbench, phpMyAdmin ou outro cliente MySQL.
2. Execute `database/schema.sql`.
3. O script cria o schema `devshowcase`, as cinco tabelas relacionais e seeds de tecnologias.

### Modelo relacional

```text
profiles (1) -------- (N) projects
                          |
                          | (N)
                          |
                          +---- project_technologies ---- (N) technologies
                          |
                          +-------- (1:N) feedbacks
```

## Execução local

```bash
npm install
cp .env.example .env
npm start
```

A API ficará disponível em `http://localhost:3000`.

## Testes

```bash
npm test
```

Os testes automatizados usam mocks dos repositórios, permitindo verificar as rotas e validações sem exigir MySQL ativo. Para validar a persistência real, execute o banco, inicie a API e importe a coleção do Postman.

## Exemplos de payload

### POST /api/profiles

```json
{
  "name": "Ana Dev",
  "email": "ana@example.com",
  "bio": "Desenvolvedora web",
  "githubUrl": "https://github.com/anadev",
  "linkedinUrl": "https://www.linkedin.com/in/anadev"
}
```

### POST /api/technologies

```json
{
  "name": "Node.js"
}
```

### POST /api/projects

```json
{
  "profileId": 1,
  "title": "DevShowcase Web",
  "description": "Projeto acadêmico",
  "repositoryUrl": "https://github.com/exemplo/devshowcase",
  "demoUrl": "https://example.com",
  "technologyIds": [1, 2]
}
```

## Grupo

- Adrielly Ferraz de Oliveira Brito
- Caroline Borges Albuquerque
- Lusia Alves da Silva Sousa Neta

Universidade Estadual do Piauí - UESPI (EAD - UAPPI), Polo Jerumenha, 2026.

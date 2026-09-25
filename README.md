# DevShowcase API

Projeto acadêmico desenvolvido para a disciplina de Desenvolvimento Backend da Universidade Estadual do Piauí – UESPI (EAD/UAPPI), Polo Jerumenha.

O **DevShowcase API** é uma API REST desenvolvida para gerenciar perfis de desenvolvedores, projetos, tecnologias e informações de feedback associadas aos projetos.

A aplicação foi construída utilizando **Node.js, Express e MySQL**, com organização em camadas, repositories para persistência dos dados, DTOs para validação das entradas e separação das responsabilidades entre rotas, controllers, services, repositories e middlewares.

---

## Tecnologias utilizadas

O projeto utiliza as seguintes tecnologias e bibliotecas:

- Node.js
- Express
- MySQL
- mysql2
- express-validator
- dotenv
- cors
- Supertest
- node:test
- nodemon

---

## Objetivo do projeto

O objetivo do DevShowcase API é disponibilizar uma API REST para armazenamento e consulta de informações relacionadas a desenvolvedores e seus projetos.

A aplicação permite:

- cadastrar perfis de desenvolvedores;
- consultar perfis cadastrados;
- cadastrar tecnologias;
- listar tecnologias;
- cadastrar projetos;
- relacionar projetos aos respectivos desenvolvedores;
- relacionar projetos às tecnologias utilizadas;
- listar projetos com seus respectivos relacionamentos;
- consultar, junto aos projetos, os feedbacks existentes no banco de dados.

---

## Entidades

A aplicação utiliza quatro entidades principais:

### Profile

Representa o perfil de um desenvolvedor.

Principais informações:

- identificador;
- nome;
- e-mail;
- biografia;
- URL do GitHub;
- URL do LinkedIn;
- data de criação.

### Project

Representa um projeto desenvolvido por um usuário.

Principais informações:

- identificador;
- perfil responsável;
- título;
- descrição;
- URL do repositório;
- URL de demonstração;
- data de criação.

### Technology

Representa uma tecnologia associada a um projeto.

Exemplos de tecnologias cadastradas durante os testes:

- Node.js;
- Express;
- MySQL;
- Docker.

### Feedback

Representa comentários ou avaliações associados a um projeto.

A entidade está implementada na estrutura do banco de dados e possui repository próprio para acesso aos dados.

Nesta atividade não foi criado endpoint específico para cadastro ou consulta individual de feedbacks, pois os endpoints exigidos concentram-se nos módulos de perfis, tecnologias e projetos.

Os feedbacks relacionados são retornados junto à listagem dos projetos.

---

## Relacionamentos

Foram implementados os seguintes relacionamentos:

- **Profile 1:N Project**
- **Project N:N Technology**
- **Project 1:N Feedback**

Isso significa que:

- um perfil pode possuir vários projetos;
- cada projeto pertence a um perfil;
- um projeto pode utilizar várias tecnologias;
- uma tecnologia pode estar relacionada a vários projetos;
- um projeto pode possuir vários feedbacks.

O relacionamento muitos-para-muitos entre `Project` e `Technology` é implementado pela tabela intermediária:

```text
project_technologies
```

---

## Arquitetura da aplicação

O projeto foi organizado em camadas para separar as responsabilidades da aplicação.

### Routes

Responsáveis pela definição dos endpoints da API.

### Controllers

Recebem as requisições HTTP e encaminham as operações para as camadas responsáveis.

### Services

Responsáveis pela aplicação das regras de negócio que exigem maior coordenação entre diferentes repositories.

No projeto atual, a camada de service é utilizada principalmente para operações relacionadas a projetos.

### Repositories

Responsáveis pelo acesso e persistência dos dados no banco MySQL.

Os comandos SQL ficam concentrados nessa camada, evitando que a lógica de acesso ao banco seja escrita diretamente nas rotas.

### DTOs

Responsáveis pela validação dos dados recebidos pela API.

As validações são realizadas utilizando a biblioteca:

```text
express-validator
```

### Middlewares

Responsáveis pelo tratamento das validações e dos erros da aplicação.

### Config

Responsável pela configuração da conexão com o banco MySQL.

---

## Estrutura do projeto

```text
DevShowcaseAPI/
│
├── database/
│   └── schema.sql
│
├── src/
│   │
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── profileController.js
│   │   ├── projectController.js
│   │   └── technologyController.js
│   │
│   ├── dtos/
│   │   ├── profile.dto.js
│   │   ├── project.dto.js
│   │   └── technology.dto.js
│   │
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   └── validation.js
│   │
│   ├── repositories/
│   │   ├── feedbackRepository.js
│   │   ├── profileRepository.js
│   │   ├── projectRepository.js
│   │   └── technologyRepository.js
│   │
│   ├── routes/
│   │   ├── profileRoutes.js
│   │   ├── projectRoutes.js
│   │   └── technologyRoutes.js
│   │
│   ├── services/
│   │   └── projectService.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests/
│   └── api.test.js
│
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

---

## Banco de dados

O projeto utiliza o Sistema Gerenciador de Banco de Dados Relacional **MySQL**.

O arquivo responsável pela criação do banco está localizado em:

```text
database/schema.sql
```

Para criar a estrutura:

1. abra o phpMyAdmin, MySQL Workbench ou outro cliente MySQL;
2. execute o arquivo `database/schema.sql`;
3. aguarde a criação do banco e das tabelas.

O script cria automaticamente o banco:

```text
devshowcase
```

Também são criadas as seguintes tabelas:

```text
profiles
technologies
projects
project_technologies
feedbacks
```

O script utiliza:

```text
utf8mb4
```

para suporte adequado aos caracteres utilizados nos dados armazenados.

---

## Tabelas do banco

### profiles

Armazena os dados dos desenvolvedores.

Possui e-mail único por meio de restrição `UNIQUE`.

### technologies

Armazena as tecnologias disponíveis.

O nome da tecnologia também possui restrição `UNIQUE`.

### projects

Armazena os projetos e sua associação com um perfil.

Possui chave estrangeira para a tabela `profiles`.

### project_technologies

Tabela intermediária responsável pelo relacionamento muitos-para-muitos entre projetos e tecnologias.

### feedbacks

Armazena comentários e avaliações relacionados aos projetos.

A avaliação, quando informada, deve estar entre:

```text
1 e 5
```

---

## Modelo relacional

Representação simplificada:

```text
Profile (1) -------- (N) Project

Project (N) -------- (N) Technology

Project (1) -------- (N) Feedback
```

O relacionamento entre Project e Technology utiliza:

```text
project_technologies
```

---

## Dados iniciais

O arquivo `schema.sql` possui registros iniciais de tecnologias para facilitar os testes.

São inseridas:

```text
Node.js
Express
MySQL
```

Durante os testes manuais também foi cadastrada:

```text
Docker
```

---

## Endpoints implementados

Foram implementados os seis endpoints principais exigidos na atividade.

### Profiles

#### Criar perfil

```http
POST /api/profiles
```

Responsável por cadastrar um novo perfil de desenvolvedor.

#### Consultar perfil por ID

```http
GET /api/profiles/:id
```

Responsável por consultar um perfil utilizando seu identificador.

---

### Technologies

#### Criar tecnologia

```http
POST /api/technologies
```

Responsável pelo cadastro de uma nova tecnologia.

#### Listar tecnologias

```http
GET /api/technologies
```

Responsável por retornar as tecnologias cadastradas.

---

### Projects

#### Criar projeto

```http
POST /api/projects
```

Responsável por cadastrar um projeto e associá-lo ao perfil e às tecnologias informadas.

#### Listar projetos

```http
GET /api/projects
```

Responsável pela listagem dos projetos cadastrados.

O retorno apresenta também:

- dados do perfil relacionado;
- tecnologias relacionadas;
- feedbacks relacionados ao projeto.

---

## Rota de verificação da API

Além dos endpoints principais, a aplicação possui uma rota para verificar se o servidor está funcionando.

```http
GET /health
```

Resposta esperada:

```json
{
  "status": "ok",
  "service": "DevShowcase API"
}
```

---

## Configuração do ambiente

O projeto utiliza variáveis de ambiente para configurar a conexão com o banco de dados.

O repositório possui o arquivo:

```text
.env.example
```

Crie uma cópia e renomeie para:

```text
.env
```

Exemplo:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=devshowcase
```

Ajuste as informações conforme a configuração do MySQL utilizado.

---

## Segurança das configurações

O arquivo:

```text
.env
```

não deve ser enviado ao GitHub.

O arquivo `.gitignore` está configurado para ignorar:

```text
node_modules/
.env
.env.*
coverage/
*.log
.vscode/
.idea/
```

O arquivo `.env.example` permanece no repositório para servir como modelo de configuração.

---

## Instalação

Antes de iniciar, é necessário possuir:

- Node.js;
- npm;
- MySQL.

Clone o projeto:

```bash
git clone https://github.com/lusialves/DevShowcaseAPI.git
```

Entre na pasta:

```bash
cd DevShowcaseAPI
```

Instale as dependências:

```bash
npm install
```

---

## Preparação do banco de dados

Abra o phpMyAdmin, MySQL Workbench ou outro cliente MySQL.

Execute:

```text
database/schema.sql
```

O banco:

```text
devshowcase
```

será criado juntamente com suas tabelas.

Depois, crie e configure o arquivo:

```text
.env
```

---

## Execução da aplicação

Para iniciar a API:

```bash
npm start
```

Antes de iniciar o servidor HTTP, a aplicação realiza um teste de conexão com o MySQL.

Se a conexão estiver funcionando, será exibida a mensagem:

```text
DevShowcase API executando em http://localhost:3000
```

A aplicação ficará disponível em:

```text
http://localhost:3000
```

Caso não seja possível estabelecer conexão com o banco, a aplicação informa:

```text
Falha ao conectar ao MySQL
```

e encerra a execução.

---

## Execução em modo de desenvolvimento

O projeto possui também o script:

```bash
npm run dev
```

Esse comando utiliza:

```text
nodemon
```

para reiniciar automaticamente a aplicação quando forem detectadas alterações nos arquivos durante o desenvolvimento.

---

## Testes automatizados

O projeto possui testes automatizados utilizando:

- `node:test`;
- Supertest.

Para executar:

```bash
npm test
```

Durante a validação do projeto foram executados:

```text
9 testes
```

Resultado obtido:

```text
tests 9
pass 9
fail 0
cancelled 0
skipped 0
todo 0
```

Portanto:

```text
9 testes executados
9 testes aprovados
0 falhas
```

---

## Testes automatizados realizados

A suíte de testes verifica:

1. `GET /health` retorna status correto;
2. `POST /api/profiles` cria perfil válido;
3. `POST /api/profiles` rejeita e-mail inválido;
4. `GET /api/profiles/:id` retorna perfil existente;
5. `POST /api/technologies` cria tecnologia válida;
6. `GET /api/technologies` lista tecnologias;
7. `POST /api/projects` cria projeto válido;
8. `POST /api/projects` rejeita URL de repositório inválida;
9. `GET /api/projects` lista projetos.

---

## Funcionamento dos testes automatizados

Os testes automatizados utilizam mocks dos repositories.

Dessa forma, é possível testar:

- rotas;
- validações;
- controllers;
- comportamento das respostas HTTP;

sem depender de uma instância ativa do MySQL durante a execução da suíte automatizada.

Os testes reais com persistência foram realizados separadamente com o banco MySQL em funcionamento.

---

## Testes reais de persistência

Além dos testes automatizados, a aplicação foi executada conectada ao MySQL.

As requisições foram realizadas diretamente pelo PowerShell utilizando:

```powershell
Invoke-RestMethod
```

Foram testados com sucesso:

```text
POST /api/profiles
GET  /api/profiles/1

POST /api/technologies
GET  /api/technologies

POST /api/projects
GET  /api/projects
```

Os dados criados pela API também foram conferidos diretamente no phpMyAdmin.

---

## Perfil utilizado nos testes

Foi criado o seguinte perfil:

```text
ID: 1
Nome: Ana Dev
E-mail: ana@example.com
Biografia: Desenvolvedora web
GitHub: https://github.com/anadev
```

O perfil foi armazenado no MySQL.

Posteriormente, a consulta:

```http
GET /api/profiles/1
```

retornou corretamente os dados cadastrados.

---

## Tecnologias utilizadas nos testes

Inicialmente estavam cadastradas:

```text
Node.js
Express
MySQL
```

Durante o teste da rota de criação de tecnologias também foi cadastrada:

```text
Docker
```

A consulta:

```http
GET /api/technologies
```

retornou as tecnologias existentes no banco.

---

## Projeto utilizado nos testes

Foi criado o projeto:

```text
ID: 1
Título: DevShowcase Web
Descrição: Projeto de demonstração
```

O projeto foi relacionado ao perfil:

```text
Ana Dev
```

e às tecnologias:

```text
Node.js
Express
```

A requisição:

```http
GET /api/projects
```

retornou corretamente:

- o projeto;
- o perfil relacionado;
- as tecnologias associadas;
- o array de feedbacks.

---

## Persistência dos relacionamentos

Após a criação do projeto, foi verificada diretamente no phpMyAdmin a tabela:

```text
project_technologies
```

Foram encontrados os registros correspondentes às associações entre:

```text
DevShowcase Web
```

e:

```text
Node.js
Express
```

Isso confirmou o funcionamento do relacionamento:

```text
Project N:N Technology
```

---

## Exemplo de criação de perfil

Endpoint:

```http
POST /api/profiles
```

Payload:

```json
{
  "name": "Ana Dev",
  "email": "ana@example.com",
  "bio": "Desenvolvedora web",
  "githubUrl": "https://github.com/anadev",
  "linkedinUrl": "https://www.linkedin.com/in/anadev"
}
```

---

## Exemplo de criação de tecnologia

Endpoint:

```http
POST /api/technologies
```

Payload:

```json
{
  "name": "Docker"
}
```

---

## Exemplo de criação de projeto

Endpoint:

```http
POST /api/projects
```

Payload:

```json
{
  "profileId": 1,
  "title": "DevShowcase Web",
  "description": "Projeto de demonstração",
  "repositoryUrl": "https://github.com/lusialves/DevShowcaseAPI",
  "demoUrl": "https://example.com",
  "technologyIds": [
    1,
    2
  ]
}
```

---

## Validação de Profile

Para criação de perfis são realizadas validações como:

- nome obrigatório;
- nome entre 2 e 120 caracteres;
- e-mail obrigatório;
- formato válido de e-mail;
- bio com no máximo 2000 caracteres;
- URL do GitHub válida quando informada;
- URL do LinkedIn válida quando informada.

O identificador utilizado na consulta por ID também precisa ser um inteiro positivo.

---

## Validação de Technology

Para criação de tecnologias:

- o nome é obrigatório;
- o nome deve possuir no máximo 80 caracteres.

O banco também impede tecnologias com nomes duplicados por meio de restrição `UNIQUE`.

---

## Validação de Project

Para criação de projetos são verificadas as seguintes condições:

- `profileId` deve ser um inteiro positivo;
- título obrigatório;
- título entre 3 e 150 caracteres;
- descrição com no máximo 4000 caracteres;
- `repositoryUrl` obrigatória e válida;
- `demoUrl` válida quando informada;
- `technologyIds` deve ser um array;
- deve existir pelo menos uma tecnologia;
- cada identificador de tecnologia deve ser um inteiro positivo.

Além disso, antes da criação do projeto, o service verifica se:

- o perfil informado existe;
- todas as tecnologias informadas existem.

---

## Transações no cadastro de projetos

O cadastro de projetos utiliza transação no MySQL.

Durante a criação:

1. é inserido o projeto;
2. são inseridos os relacionamentos em `project_technologies`;
3. a transação é confirmada com `commit`.

Se ocorrer erro durante o processo, é executado:

```text
rollback
```

Isso evita que sejam gravados dados incompletos.

---

## Tratamento de erros

A aplicação possui middleware centralizado para tratamento dos erros:

```text
src/middlewares/errorHandler.js
```

Quando ocorre tentativa de cadastrar um valor duplicado em um campo que exige unicidade, a API pode retornar:

```text
HTTP 409
```

com mensagem indicando registro duplicado.

Outros erros são tratados de acordo com o status definido pela aplicação ou como erro interno do servidor.

---

## Respostas HTTP utilizadas

Entre os códigos utilizados pela API estão:

```text
200 - Requisição realizada com sucesso
201 - Registro criado com sucesso
400 - Dados inválidos
404 - Recurso ou rota não encontrada
409 - Registro duplicado
500 - Erro interno do servidor
```

---

## Repositório do projeto

Código-fonte disponível no GitHub:

https://github.com/lusialves/DevShowcaseAPI

Branch principal:

```text
main
```

---

## Como executar após clonar

Execute:

```bash
git clone https://github.com/lusialves/DevShowcaseAPI.git
```

Depois:

```bash
cd DevShowcaseAPI
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo:

```text
.env
```

utilizando:

```text
.env.example
```

como referência.

Execute o script:

```text
database/schema.sql
```

no MySQL.

Depois inicie:

```bash
npm start
```

Para executar os testes automatizados:

```bash
npm test
```

---

## Resultado final dos testes

A validação realizada confirmou:

- servidor Node.js funcionando;
- conexão com o MySQL;
- rota `/health` funcionando;
- criação e consulta de perfis;
- criação e listagem de tecnologias;
- criação e listagem de projetos;
- persistência dos dados no MySQL;
- relacionamento entre perfil e projeto;
- relacionamento entre projetos e tecnologias;
- retorno dos feedbacks associados aos projetos;
- validações dos dados de entrada;
- tratamento de erros;
- funcionamento dos endpoints exigidos.

Resultado da suíte automatizada:

```text
9 testes executados
9 testes aprovados
0 falhas
```

---

## Conclusão

O desenvolvimento do **DevShowcase API** permitiu aplicar conceitos fundamentais de desenvolvimento backend utilizando Node.js, Express e MySQL.

A aplicação utiliza separação de responsabilidades entre rotas, controllers, services, repositories, DTOs, middlewares e configuração do banco de dados.

Também foram implementados relacionamentos entre entidades, validação das entradas, persistência em banco relacional, tratamento de erros e testes automatizados.

Os testes realizados demonstraram o funcionamento dos seis endpoints principais exigidos na atividade e confirmaram a persistência dos registros no MySQL.

O relacionamento muitos-para-muitos entre projetos e tecnologias também foi validado diretamente no banco de dados.

---

## Grupo

- Adrielly Ferraz de Oliveira Brito
- Caroline Borges Albuquerque
- Lusia Alves da Silva Sousa Neta

---

**Universidade Estadual do Piauí – UESPI**  
**EAD – UAPPI**  
**Polo Jerumenha**  
**Curso: Tecnologia em Sistemas para Internet**  
**2026**

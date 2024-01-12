# Talker Manager

Este projeto é uma API utilizando `Node.js` e `ExpressJS` de cadastro de talkers (palestrantes) em que será possível cadastrar, visualizar, pesquisar, editar e excluir informações (`CRUD (Create, Read, Update e Delete)`).

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Docker](https://www.docker.com/)

## Como Rodar o Projeto

1. Clone o repositório
2. Instale as dependências com `npm install`

### Com Docker

1. Inicie os containers `docker-compose up -d`
2. Acesse o terminal do container e inicie a aplicação `docker exec -it talker_manager bash` e depois `npm start`
3. Ou inicie com live-reload `npm run dev`

### Sem Docker

1. Crie um arquivo `.env` baseado no `env.example`
2. Inicie a aplicação sem o container `npm install` depois `env $(cat .env) npm start`
3. Ou inicie com live-reload `env $(cat .env) npm run dev`

## Docker

Este projeto pode ser rodado em um ambiente Docker. As instruções para isso estão no arquivo `Dockerfile` e `docker-compose.yml`.

## ESLint

Este projeto utiliza ESLint para linting. A configuração pode ser encontrada no arquivo `.eslintrc.json`.

## Rotas

As rotas da aplicação estão definidas nos arquivos `src/routes/login.router.js` e `src/routes/talker.router.js`.

## Contribuição

Este projeto é para fins educacionais, portanto, pull requests não serão aceitos.

## Licença

MIT

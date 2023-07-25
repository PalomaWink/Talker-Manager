const express = require('express');
const router = require('./routes/talker.router');
const routerLogin = require('./routes/login.router');

const app = express();
app.use(express.json());

app.use(router);
app.use(routerLogin);

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
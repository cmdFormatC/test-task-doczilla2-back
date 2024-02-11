require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const { handleErrorConstructor } = require('./utils/handleErrorTools');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(bodyParser.json());

app.use('/students', require('./routes/students'));

app.use('*', (req, res, next) => {
  next(handleErrorConstructor(404, 'Ресурс не найден'));
});

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${BASE_PATH + PORT}`);
});

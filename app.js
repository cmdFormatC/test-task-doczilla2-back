require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { handleErrorConstructor } = require('./utils/handleErrorTools');
const { handleError } = require('./middlewares/handleError');

const { PORT = 3030, BASE_PATH } = process.env;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/students', require('./routes/students'));

app.use('*', (req, res, next) => {
  next(handleErrorConstructor(404, 'Ресурс не найден'));
});

app.use(handleError);

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${BASE_PATH + PORT}`);
});

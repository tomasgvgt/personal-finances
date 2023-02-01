require('dotenv').config();
const express = require('express');
const errorHandler = require('./middlewares/errorHandling');
const routes = require('./routes');

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

routes(app);

app.use(errorHandler());

app.get('/', (req, res) => {
  res.status(200).json({ environment: process.env.NODE_ENV });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
  });
}

module.exports = app;

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const morgan = require('morgan');

const PORT = process.env.PORT;

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/user', async (req, res) => {
  try {
    const user = await db.User.create(req.body);

    if (user) {
      console.log(req.body);
      return res.status(200).send('Ok');
    }
  } catch (error) {
    return res.status(404).json(error);
  } finally {
  }
});

app.get('/', (req, res) => {
  res.status(200).send(`
    <html>
    <body>
    <h1>Personal Finances</h1>
    </body>
    </html>
    `);
});

if (process.env.NODE_ENV !== 'test')
  app.listen(PORT, async () => {
    try {
      await db.sequelize.authenticate();
      console.log(`Server listening on: http://localhost:${PORT}`);
    } catch (error) {
      console.error(error);
    }
  });

module.exports = app;

require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const Boom = require('@hapi/boom');
const path = require('path');

const PORT = process.env.PORT;

const app = express();

app.engine('.html', require('ejs').__express);

app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html');

const users = [
  { name: 'toby', email: 'toby@gmail.com' },
  { name: 'loki', email: 'loki@gmail.com' },
  { name: 'jane', email: 'jane@gmail.com' },
  { name: 'co', email: 'co@gmail.com' },
];

app.use(express.json());

//app.use('/auth', authRouter);

routes(app);

app.use((err, req, res, next) => {
  // console.error(err.stack);
  // console.log(Object.keys(err.details));
  const boom = new Boom.Boom(err);

  console.log('______');
  console.log(boom);
  console.log('______');

  res.status(500).send('Something broke!');
});

app.get('/', (req, res) => {
  res.render('users', {
    users,
    title: 'ejs example working',
    header: 'Some users',
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
  });
}

module.exports = app;

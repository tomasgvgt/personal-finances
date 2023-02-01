require('dotenv').config();
const express = require('express');
const errorHandler = require('./middlewears/errorHandling');
const routes = require('./routes');
const Boom = require('@hapi/boom');
const path = require('path');

const PORT = process.env.PORT;

const app = express();

app.engine('.html', require('ejs').__express);

app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'html');

app.use(express.json());

//app.use('/auth', authRouter);

routes(app);

app.use(errorHandler());

app.get('/', (req, res) => {
  res.render('home', {
    title: 'ejs example working',
    header: 'Some users',
  });
});

app.get('/login', (req, res) => {
  res.render('login', {
    title: 'ejs example working',
    header: 'Some users',
  });
});

app.get('/sign-up', (req, res) => {
  res.render('sign-up', {
    title: 'ejs example working',
    header: 'Some users',
  });
});

app.get('/new-account', (req, res) => {
  res.render('new-account', {
    title: 'ejs example working',
    header: 'Some users',
  });
});

app.get('/accounts', (req, res) => {
  res.render('new-account', {
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

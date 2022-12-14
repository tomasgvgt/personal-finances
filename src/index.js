require('dotenv').config();
const express = require('express');
const routes = require('./routes');
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

app.get('/', (req, res) => {
  res.render('users', {
    users,
    title: 'ejs example working',
    header: 'Some users',
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});

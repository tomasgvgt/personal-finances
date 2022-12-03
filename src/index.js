require('dotenv').config();
const express = require('express');
const routes = require('./routes');

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

//app.use('/auth', authRouter);
routes(app);


app.get('/', (req, res) => {
  res.status(200).send(`
    <html>
    <body>
    <h1>Personal Finances</h1>
    <p>Another text</p>
    </body>
    </html>
    `);
});

app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});

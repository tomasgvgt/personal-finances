const express = require('express')
require('dotenv').config()

const PORT = process.env.PORT
const app = express()

app.get('/', (req, res) => {
    res.status(200).send(`
    <html>
    <body>
    <h1>Personal Finances</h1>
    </body>
    </html>
    `)
})

app.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`)
})

const express = require('express')
require('dotenv').config()
const  db   = require('../models')

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

app.listen(PORT, async () => {
        console.log(`Server listening on: http://localhost:${PORT}`)
    // try {
    //     // console.log(Object.keys(db.sequelize.connectionManager.prototype))
    //     // await db.sequelize.authenticate()

    //     console.log(`Connected to ${process.env.DB_DATABASE}`)
        
    // } catch (error) {
    //    console.error('Unable to connect to db \n Reason: ', error) 
    // }
})

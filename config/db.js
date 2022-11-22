const {Sequelize} = require('sequelize');

const { DB_DATABASEE, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_DATABASEE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql' 
})

module.exports = {sequelize}

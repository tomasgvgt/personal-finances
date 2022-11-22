module.exports = {
    "development": {
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_DATABASE,
      "host": process.env.DB_HOST,
      "dialect": "mysql"
    },
    "test": {
      "username": "usercito",
      "password": "passwordcita",
      "database": "personal_finances",
      "host": "127.0.0.1"
    },
    "production": {
      "username": "usercito",
      "password": "passwordcita",
      "database": "personal_finances",
      "host": "127.0.0.1"
    }
  }

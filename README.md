# Personal Finances App 💳

Personal finanaces app is a web application designed to keep track of your personal income and expenses in a simple and efficient way.

## Main features

### 1. Personal User.
Create a private user and password which is stateless authenticated using Json Web Tokens, where you can store all your financial information and review it anytime you like.

### 2. Accounts.
Create, review, modify and delete your bank accounts to keep track of all the banking transactions you have in each account and the money or debt each one holds.

### 3. Categories.
Categorise every transaction you make to group them in a way that swits your needs.

### 4. Transactions.
Create, review and delete transactions to keep track of every financial movement you make and be clear about which category and account it belongs to.

### Swagger UI displaying endpoints of the API
![image](https://user-images.githubusercontent.com/60365542/217623907-232b6832-0516-4038-8fe1-b9b6ed0912a5.png)


## Installation

Make sure you have Node.Js installed

Clone project

```bash
git clone https://github.com/tomasgvgt/personal-finances.git
cd personal-finances
```

Configure env variables in env file

```bash
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=personal_finances
DB_DATABASE_TEST=test_personal_finances
DB_USERNAME=
DB_PASSWORD=
DB_ROOT_PASSWORD=
SECRET_KEY=
```

Install all npm dependencies required

```bash
npm install
```

Start docker postgreSQL container

```bash
docker compose up -d  postgres
```

run the application
```bash
npm run dev
```

## Stack

- Node.js
- Express.js
- SQL database: PostgreSQL
- Docker
- Swagger
- Sequelize
- Json Web Token
- passport.Js
- Boom
- Bcrypt

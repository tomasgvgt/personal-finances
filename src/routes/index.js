const express = require('express');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const accountRouter = require('./account.routes');
const transactionRouter = require('./transaction.routes');
const categoryRouter = require('./category.routes')

function routes(app){
    const apiV1Router = express.Router();
    app.use('/api/v1', apiV1Router);
    apiV1Router.use('/auth' ,authRouter);
    apiV1Router.use('/user', userRouter);
    apiV1Router.use('/account', accountRouter);
    apiV1Router.use('/transaction', transactionRouter);
    apiV1Router.use('/category', categoryRouter);
}


module.exports = routes;

const authRouter = require('express').Router();
const { userSignUpController } = require('../controllers/auth.controller');

authRouter.post('/sign-up', userSignUpController);

module.exports = authRouter;

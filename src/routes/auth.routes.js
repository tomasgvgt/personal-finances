const authRouter = require('express').Router();
const { userSignUpController } = require('../controllers/auth.controller');
const {createUserSchema} = require('../schemas/user.schema');
const dataValidator = require('../middlewears/dataValidation');

authRouter.post('/sign-up', dataValidator(createUserSchema, 'body'), userSignUpController);

module.exports = authRouter;

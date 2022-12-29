const authRouter = require('express').Router();
const { userSignUpController, userLogInController } = require('../controllers/auth.controller');
const {createUserSchema} = require('../schemas/user.schema');
const dataValidator = require('../middlewears/dataValidation');
const passport = require('../auth');

authRouter.post('/sign-up', dataValidator(createUserSchema, 'body'), userSignUpController);
authRouter.post('/log-in', passport.authenticate('local', {session: false}), userLogInController);


module.exports = authRouter;

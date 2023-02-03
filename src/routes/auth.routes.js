const authRouter = require('express').Router();
const {
  userSignUpController,
  userLogInController,
} = require('../controllers/auth.controller');
const { createUserSchema } = require('../schemas/user.schema');
const dataValidator = require('../middlewares/dataValidation');
const passport = require('../auth');

/**
 * @swagger
 * /api/v1/auth/sign-up:
 *  post:
 *    summary: Create new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *    responses:
 *      200:
 *        description: OK
 */
authRouter.post(
  '/sign-up',
  dataValidator(createUserSchema, 'body'),
  userSignUpController,
);

/**
 * @swagger
 * /api/v1/auth/log-in:
 *  post:
 *    summary: User log in
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *    responses:
 *      200:
 *        description: OK
 */
authRouter.post(
  '/log-in',
  passport.authenticate('local', { session: false }),
  userLogInController,
);

module.exports = authRouter;

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
 * components:
 *  schemas:
 *    CreateUser:
 *      type: object
 *      properties:
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        email:
 *          type: string
 *        password:
 *          type: string
 *        userName:
 *          type: string
 *      example:
 *        firstName: Hephaestus
 *        lastName: Olimpicus
 *        email: hephaestus@olympus.com
 *        userName: hephaestus
 *        password: '12345'
 *    LoginUser:
 *      type: object
 *      properties:
 *        password:
 *          type: string
 *        username:
 *          type: string
 *      example:
 *        username: hephaestus
 *        password: '12345'
 */

/**
 * @swagger
 * /api/v1/auth/sign-up:
 *  post:
 *    summary: Create new user
 *    tags: [Sign Up]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/CreateUser'
 *    responses:
 *      201:
 *        description: Created
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
 *    tags: [Log In]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/LoginUser'
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

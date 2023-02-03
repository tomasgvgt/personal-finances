const account = require('../controllers/account.controller');
const router = require('express').Router();
const {
  createAccountSchema,
  getAccountSchema,
  updateAccountSchema,
  deleteAccountSchema,
} = require('../schemas/account.schema');
const dataValidator = require('../middlewares/dataValidation');
const passport = require('../auth');

/**
 * @swagger
 * /api/v1/account/:
 *  post:
 *    summary: Create account
 *    tags: [Account]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *    responses:
 *      200:
 *        description: OK
 *    security:
 *      - bearerAuth: []
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  dataValidator(createAccountSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      data.userId = req.user.id;
      let newAccount = await account.createAccount(data);
      res.status(201);
      res.send(newAccount);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @swagger
 * /api/v1/account/user-accounts:
 *  get:
 *    summary: Get all accounts from user
 *    tags: [Account]
 *    responses:
 *      200:
 *        description: OK
 *    security:
 *      - bearerAuth: []
 */
router.get(
  '/user-accounts/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      let accounts = await account.getAccountsFromUser(userId);
      res.status(200);
      res.send(accounts);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @swagger
 * /api/v1/account/{id}:
 *  patch:
 *    summary: Update account
 *    tags: [Account]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *    responses:
 *      200:
 *        description: OK
 *    security:
 *      - bearerAuth: []
 */
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  dataValidator(updateAccountSchema, 'body'),
  dataValidator(getAccountSchema, 'params'),
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const accountId = req.params.id;
      const data = req.body;
      await account.updateAccount(userId, accountId, data);
      res.status(200);
      res.send('Modified');
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @swagger
 * /api/v1/account/{id}:
 *  delete:
 *    summary: Delete account
 *    tags: [Account]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *    responses:
 *      200:
 *        description: OK
 *    security:
 *      - bearerAuth: []
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  dataValidator(deleteAccountSchema, 'params'),
  async (req, res, next) => {
    try {
      const accountId = req.params.id;
      const userId = req.user.id;
      await account.deleteAccount(userId, accountId);
      res.status(200);
      res.send('Deleted');
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;

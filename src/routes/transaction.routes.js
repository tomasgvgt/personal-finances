const router = require('express').Router();
const transaction = require('../controllers/transaction.controller');
const dataValidator = require('../middlewares/dataValidation');
const passport = require('../auth');
const {
  createTransactionSchema,
  getTransactionsFromAccountSchema,
  getTransactionsFromUserSchema,
  getFromCategorySchema,
  updateTransactionSchema,
  getFromTransactionIdSchema,
  deleteTransactionSchema,
} = require('../schemas/transaction.schema');

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateTransaction:
 *      type: object
 *      properties:
 *        type:
 *          type: string
 *        amount:
 *          type: integer
 *        description:
 *          type: string
 *        categoryId:
 *          type: integer
 *        accountId:
 *          type: integer
 *        userId:
 *          type: integer
 *      example:
 *        type: expense
 *        amount: 2000
 *        categoryId: 44
 *        accountId: 17
 *        userId: 25
 *    UpdateTransaction:
 *      type: object
 *      properties:
 *        description:
 *          type: string
 *      example:
 *        description: New description
 */

/**
 * @swagger
 * /api/v1/transaction/:
 *  post:
 *    summary: Create transaction
 *    tags: [Transaction]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/CreateTransaction'
 *    responses:
 *      201:
 *        description: Created
 *      401:
 *        description: Unauthorized
 *      422:
 *        description: Unprocessable Entity
 *    security:
 *      - bearerAuth: []
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  dataValidator(createTransactionSchema, 'body'),
  async (req, res, next) => {
    try {
      if (req.body.userId !== req.user.id) {
        const error = new Error('Unauthorized');
        error.name = 'UnauthorizedError';
        throw error;
      }
      let data = req.body;
      let newTransaction = await transaction.createTransaction(data);
      res.status(201);
      res.send(newTransaction);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @swagger
 * /api/v1/transaction/user-transactions:
 *  get:
 *    summary: Get all transactions from user
 *    tags: [Transaction]
 *    parameters:
 *      - in: query
 *        name: category
 *        description: category ID
 *        required: false
 *    responses:
 *      200:
 *        description: OK
 *      401:
 *        description: Unauthorized
 *    security:
 *      - bearerAuth: []
 */
router.get(
  '/user-transactions',
  passport.authenticate('jwt', { session: false }),
  dataValidator(getFromCategorySchema, 'query'),
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      let categoryId;
      if (req.query.category) categoryId = req.query.category;
      let transactions = await transaction.getTransactionsFromUser(
        userId,
        categoryId,
      );
      res.status(200);
      res.send(transactions);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @swagger
 * /api/v1/transaction/account/{accountId}:
 *  get:
 *    summary: Get all transactions from account
 *    tags: [Transaction]
 *    parameters:
 *      - in: path
 *        name: accountId
 *        required: true
 *      - in: query
 *        name: category
 *        description: category ID
 *        required: false
 *    responses:
 *      200:
 *        description: OK
 *      401:
 *        description: Unauthorized
 *    security:
 *      - bearerAuth: []
 */
router.get(
  '/account/:accountId',
  passport.authenticate('jwt', { session: false }),
  dataValidator(getTransactionsFromAccountSchema, 'params'),
  dataValidator(getFromCategorySchema, 'query'),
  async (req, res, next) => {
    try {
      let accountId = req.params.accountId;
      let userId = req.user.id;
      let categoryId;
      if (req.query.category) categoryId = req.query.category;
      let transactions = await transaction.getTransactionsFromAccount(
        userId,
        accountId,
        categoryId,
      );
      res.status(200);
      res.send(transactions);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @swagger
 * /api/v1/transaction/{id}:
 *  patch:
 *    summary: Update transaction
 *    tags: [Transaction]
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
 *            $ref: '#/components/schemas/UpdateTransaction'
 *    responses:
 *      200:
 *        description: Updated
 *      401:
 *        description: Unauthorized
 *      422:
 *        description: Unprocessable Entity
 *    security:
 *      - bearerAuth: []
 */
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  dataValidator(updateTransactionSchema, 'body'),
  dataValidator(getFromTransactionIdSchema, 'params'),
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const transactionId = req.params.id;
      const data = req.body;
      await transaction.updateTransaction(userId, transactionId, data);
      res.status(200);
      res.send('Updated');
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @swagger
 * /api/v1/transaction/{id}:
 *  delete:
 *    summary: Delete transaction
 *    tags: [Transaction]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *    responses:
 *      200:
 *        description: OK
 *      401:
 *        description: Unauthorized
 *      422:
 *        description: Unprocessable Entity
 *    security:
 *      - bearerAuth: []
 */
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  dataValidator(deleteTransactionSchema, 'params'),
  async (req, res, next) => {
    try {
      const transactionId = req.params.id;
      const userId = req.user.id;
      await transaction.deleteTransaction(userId, transactionId);
      res.status(200);
      res.send('Deleted');
    } catch (err) {
      next(err);
    }
  },
);

module.exports = router;

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

router.get(
  '/user/:userId',
  passport.authenticate('jwt', { session: false }),
  dataValidator(getTransactionsFromUserSchema, 'params'),
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

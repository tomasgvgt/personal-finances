const categoryRouter = require('express').Router();
const category = require('../controllers/category.controller');
const dataValidator = require('../middlewares/dataValidation');
const passport = require('../auth');
const {
  createCategorySchema,
  deleteCategorySchema,
  updateCategorySchema,
} = require('../schemas/category.schema');

/**
 * @swagger
 * /api/v1/category/:
 *  post:
 *    summary: Create category
 *    tags: [Category]
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
categoryRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  dataValidator(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      let userId = req.user.id;
      let { name } = req.body;
      let newCategory = await category.createCategory(userId, name);
      res.status(201);
      res.send(newCategory);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @swagger
 * /api/v1/category/{id}:
 *  delete:
 *    summary: Delete category
 *    tags: [Category]
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
categoryRouter.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  dataValidator(deleteCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const categoryId = req.params.id;
      const userId = req.user.id;
      await category.deleteCategory(userId, categoryId);
      res.status(200);
      res.send('Deleted');
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @swagger
 * /api/v1/category/:
 *  patch:
 *    summary: Update account
 *    tags: [Category]
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
categoryRouter.patch(
  '/',
  passport.authenticate('jwt', { session: false }),
  dataValidator(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      let id = req.body.id;
      let name = req.body.name;
      let userId = req.user.id;
      await category.updateCategory(userId, id, name);
      res.status(200);
      res.send('Updated');
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @swagger
 * /api/v1/category/user-categories:
 *  get:
 *    summary: Get all categories from user
 *    tags: [Category]
 *    responses:
 *      200:
 *        description: OK
 *    security:
 *      - bearerAuth: []
 */
categoryRouter.get(
  '/user-categories',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      let userId = req.user.id;
      let categoriesFromUser = await category.getUserCategories(userId);
      res.status(200).send(categoriesFromUser);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = categoryRouter;

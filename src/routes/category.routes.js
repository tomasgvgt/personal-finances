const categoryRouter = require('express').Router();
const category = require('../controllers/category.controller');
const dataValidator = require('../middlewares/dataValidation');
const passport = require('../auth');
const {
  createCategorySchema,
  getCategoriesSchema,
  deleteCategorySchema,
  updateCategorySchema,
} = require('../schemas/category.schema');

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
categoryRouter.get(
  '/:userId',
  passport.authenticate('jwt', { session: false }),
  dataValidator(getCategoriesSchema, 'params'),
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

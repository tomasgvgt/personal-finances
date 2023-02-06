const userRouter = require('express').Router();
const user = require('../controllers/user.controller');
const { getUserSchema, updateUserSchema } = require('../schemas/user.schema');
const dataValidator = require('../middlewares/dataValidation');
const passport = require('../auth');

/**
 * @swagger
 * components:
 *  schemas:
 *    UpdateUser:
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
 *      example:
 *        firstName: Richard
 *        lastName: Roe
 *        email: richardroe@coolemail.com
 */

/**
 * @swagger
 * /api/v1/user:
 *  get:
 *    summary: Get all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: OK
 */
userRouter.get('/', async (req, res, next) => {
  try {
    const data = await user.getAllUsers();
    res.status(200);
    res.send(data);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/v1/user/id:
 *  get:
 *    summary: Get user with specific ID
 *    tags: [User]
 *    responses:
 *      200:
 *        description: OK
 *      401:
 *        description: Unauthorized
 *    security:
 *      - bearerAuth: []
 */
userRouter.get(
  '/id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const data = await user.getUser(userId);
      res.status(200);
      res.send(data);
    } catch (err) {
      next(err);
    }
  },
);

/**
 * @swagger
 * /api/v1/user:
 *  patch:
 *    summary: Update user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/UpdateUser'
 *    responses:
 *      200:
 *        description: Updated
 *      401:
 *        description: Unauthorized
 *    security:
 *      - bearerAuth: []
 */
userRouter.patch(
  '/',
  passport.authenticate('jwt', { session: false }),
  dataValidator(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const userId = req.user.id;
      await user.updateUser(userId, data);
      res.status(200);
      res.send('Updated');
    } catch (err) {
      next(err);
    }
  },
);

// userRouter.delete('/:id', async (req, res, next)=>{
//     try{
//         const userId = req.params.id;
//         await user.deleteUser(userId);
//         res.status(200);
//         res.send("Deleted")
//     }catch(err){
//         next(err)
//     }
// })

module.exports = userRouter;

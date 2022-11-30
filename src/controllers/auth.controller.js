const db = require('../db/models');

const userSignUpController = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    /**
     * TODO:
     * - Data validation
     * - Password encryption
     * - Authentication
     */
    console.log(req.body);

    await db.User.create({
      firstName,
      lastName,
      email,
      password,
    });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const userLogInController = (req, res) => {
  res.sendStatus(404);
};

module.exports = { userSignUpController, userLogInController };

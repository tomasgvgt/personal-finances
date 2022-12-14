const db = require('../db/models');
const hashPassword = require('../auth/hash.auth')

const userSignUpController = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;

    /**
     * TODO:
     * - Data validation
     * - Password encryption
     * - Authentication
     */
    console.log(req.body);

    const hashedPassword = await hashPassword(password);
    let user = await db.User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });
    delete user.dataValues.password;
    res.status(201)
    res.send({
      message: user
    })
  } catch (error) {
    console.log(error);
    res.status(400)
    res.send({
        error
    })
  }
};

const userLogInController = (req, res) => {
  //login logic here
  res.sendStatus(404);
};

module.exports = { userSignUpController, userLogInController };

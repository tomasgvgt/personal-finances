const db = require('../db/models');
const {hashPassword} = require('../auth/hash.auth');
const localStrategy = require('../auth/localStrategy.auth');

const userSignUpController = async (req, res, next) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;
    /**
     * TODO:
     * - Data validation
     * - Password encryption
     * - Authentication
     */

    const hashedPassword = await hashPassword(password);
    let user = await db.User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });
    delete user.dataValues.password;
    res.status(201);
    res.send({
      message: user,
    });
  } catch (error) {
    next(error);
  }
};

const userLogInController = async (req, res, next)=>{
  console.log("imInUserLoginController");
  try{
    res.json({
      message: "User",
      body: req.user
    })
  }catch(err){
    next(err);
  }
};

module.exports = { userSignUpController, userLogInController };

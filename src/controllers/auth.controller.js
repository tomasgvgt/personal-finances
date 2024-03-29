const db = require('../db/models');
const {hashPassword} = require('../auth/hash.auth');
const localStrategy = require('../auth/localStrategy.auth');
const {createToken} = require('../auth/token.auth');

const userSignUpController = async (req, res, next) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    let user = await db.User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });
    delete user.dataValues.password;
    console.log(user);
    res.status(201);
    res.send({
      message: user,
    });
  } catch (error) {
    next(error);
  }
};

const userLogInController = async (req, res, next)=>{
  try{
    const token = createToken(req.user)
    res.json({
      id: req.user.id,
      token
    });
  }catch(err){
    next(err);
  }
};

module.exports = { userSignUpController, userLogInController };

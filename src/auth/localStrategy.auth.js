const LocalStrategy = require('passport-local');
const user = require('../controllers/user.controller');
const {verifyPassword} = require('./hash.auth');

const localStrategy = new LocalStrategy(async (username, password, done)=>{
  try {
    const theUser = await user.getUserByUserName(username);
    const error = new Error('Unauthorized');
    error.name = "UnauthorizedError";
    if(!theUser) done(error, false);
    const isPassword = await verifyPassword(password, theUser.password);
    if(!isPassword) done(error, false);
    delete theUser.dataValues.password;
    done(null, theUser);
  } catch(err) {
    const error = new Error('Unauthorized');
    error.name = "UnauthorizedError";
    done(error, false);
  }
})


module.exports = localStrategy;
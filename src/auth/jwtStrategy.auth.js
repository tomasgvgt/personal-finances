const {Strategy, ExtractJwt} = require('passport-jwt');
const user = require('../controllers/user.controller');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY
}

const jwtStrategy = new Strategy(options, async (payload, done)=>{
  try{
    const error = new Error('Unauthorized');
    error.name = "UnauthorizedError";
    const theUser = await user.getUser(payload.id);
    if(!theUser) done(error, false);
    done(null, payload)
  }catch(err){
    const error = new Error('Unauthorized');
    error.name = "UnauthorizedError";
    done(error, false);
  }
})

module.exports = jwtStrategy;

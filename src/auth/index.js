const passport = require('passport');
const localStrategy = require('./localStrategy.auth');
const jwtStrategy = require('./jwtStrategy.auth');

passport.use(localStrategy);
passport.use(jwtStrategy);

module.exports = passport;
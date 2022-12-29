const passport = require('passport');
const localStrategy = require('./localStrategy.auth');

passport.use(localStrategy);

module.exports = passport;
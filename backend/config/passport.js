const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secretOrKey } = require('./keys');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
exports.requireUser = passport.authenticate('jwt', { session: false });

passport.use(new LocalStrategy({
    session: false,
    usernameField: 'email',
    passwordField: 'password',
  }, async function (email, password, done) {
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.hashedPassword, (err, isMatch) => {
        if (err || !isMatch) done(null, false);
        else done(null, user);
      });
    } else
      done(null, false);
}));

exports.loginUser = async function(user) {
    const userInfo = {
      _id: user._id,
      username: user.username,
      email: user.email
    };
    const token = await jwt.sign(
      userInfo, // payload
      secretOrKey, // sign with secret key
      { expiresIn: 3600 } // tell the key to expire in one hour
    );
    return {
      user: userInfo,
      token
    };
};

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secretOrKey;

passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload._id)
    if (user) {
      // return the user to the frontend
      return done(null, user);
    }
    // return false since there is no user
    return done(null, false);
  }
  catch(err) {
    done(err);
  }
}));

// requireUser is an Express middleware that will not allow a route handler to
// perform its action unless there is a current user logged in (will attach
// current user as req.user, or return an error response if there is no current
// user)
exports.requireUser = passport.authenticate('jwt', { session: false });

// restoreUser is an Express middleware that will load the current user
// on req.user, but will NOT return an error response if there is no current
// user
exports.restoreUser = (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, function(err, user) {
    if (err) return next(err);
    if (user) req.user = user;
    next();
  })(req, res, next);
};

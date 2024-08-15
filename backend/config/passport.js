const jwt = require('jsonwebtoken');
const { secretOrKey, refreshSecretOrKey } = require('./keys');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const User = mongoose.model('User');

if (!secretOrKey || !refreshSecretOrKey) {
  throw new Error('SECRET_OR_KEY and REFRESH_SECRET_OR_KEY must be set');
}


passport.use(new LocalStrategy({
  session: false,
  usernameField: 'email',
  passwordField: 'password',
}, async function (email, password, done) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));


exports.loginUser = async function (user) {
  const userInfo = {
    _id: user._id,
    username: user.username,
    email: user.email,
    profileImageUrl: user.profileImageUrl
  };

  try {
    const accessToken = jwt.sign(userInfo, secretOrKey, { expiresIn: '1h' });
    const refreshToken = jwt.sign(userInfo, refreshSecretOrKey, { expiresIn: '7d' });

    return {
      user: userInfo,
      accessToken,
      refreshToken
    };
  } catch (err) {
    console.error('Error generating tokens:', err);
    throw err;
  }
};

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretOrKey
};

passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload._id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (err) {
    done(err);
  }
}));


exports.requireUser = passport.authenticate('jwt', { session: false });

exports.restoreUser = (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, function (err, user) {
    if (user) req.user = user;
    next();
  })(req, res, next);
};

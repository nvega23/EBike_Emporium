const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');
const { loginUser, restoreUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
const { singleFileUpload, singleMulterUpload } = require('../../awsS3');
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');

const router = express.Router();

const DEFAULT_PROFILE_IMAGE_URL = 'https://nestors-demo-seed.s3.us-west-1.amazonaws.com/bridge.jpeg';

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({
    message: 'GET /api/users',
    profileImageUrl: req.user ? req.user.profileImageUrl : null,
  });
});

router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie('CSRF-Token', csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  });
});

router.post('/register', singleMulterUpload('image'), validateRegisterInput, async (req, res, next) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (existingUser) {
      const err = new Error('Validation Error');
      err.statusCode = 400;
      const errors = {};
      if (existingUser.email === req.body.email) {
        errors.email = 'A user has already registered with this email';
      }
      if (existingUser.username === req.body.username) {
        errors.username = 'A user has already registered with this username';
      }
      err.errors = errors;
      return next(err);
    }

    const profileImageUrl = req.file
      ? await singleFileUpload({ file: req.file, public: true })
      : DEFAULT_PROFILE_IMAGE_URL;

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      profileImageUrl,
    });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
        if (err) throw err;
        newUser.hashedPassword = hashedPassword;
        const savedUser = await newUser.save();
        const tokens = await loginUser(savedUser);
        return res.json(tokens);
      });
    });
  } catch (err) {
    next(err);
  }
});

router.post('/login', validateLoginInput, async (req, res, next) => {
  console.log('Starting authentication process...');
  passport.authenticate('local', async function (err, user) {
    console.log('Inside passport authenticate');
    if (err) {
      console.error('Error during authentication:', err);
      return next(err);
    }
    if (!user) {
      console.log('User not found or invalid credentials');
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: 'Invalid credentials' };
      return next(err);
    }
    const tokens = await loginUser(user);
    return res.json(tokens);
  })(req, res, next);
});


router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-hashedPassword');
    return res.json(user);
  } catch (err) {
    return res.status(404).json({ notfound: 'User not found' });
  }
});

module.exports = router;

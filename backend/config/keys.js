require('dotenv').config();

module.exports = {
  secretOrKey: process.env.SECRET_OR_KEY,
  mongoURI: process.env.MONGODB_URI,
  isProduction: process.env.NODE_ENV === 'production'
};

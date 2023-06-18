const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

// validateTweetInput is a combination Express middleware that uses the `check`
// middleware to validate the keys in the body of a request to create/edit
// a tweet
const validatePostInput = [
  check('body')
    .exists({ checkFalsy: true })
    .isLength({ max: 140 })
    .withMessage('Post must be equal or less than 140 characters'),

  check('price')
    .exists({ checkFalsy: true })
    .withMessage("Price field should not be empty")
    .isFloat()
    .withMessage('Price needs to be a number'),
  handleValidationErrors
];

module.exports = validatePostInput;

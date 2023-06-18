const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateReviewInput = [

    check('title')
    .exists({ checkFalsy: true })
    .withMessage("Title field should not be empty")
    .isLength({ min: 1, max: 25})
    .withMessage('Title must be between 1 and 25 characters'),

    check('body')
    .exists({ checkFalsy: true })
    .withMessage("Body field should not be empty")
    .isLength({ min: 0, max: 340 })
    .withMessage('Body must be between 0 and 340 characters'),

    check('rating')
    .exists({ checkFalsy: true })
    .withMessage("Body field should not be empty")
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),

    handleValidationErrors
]


module.exports =  validateReviewInput;

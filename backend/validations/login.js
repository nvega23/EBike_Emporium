const { check } = require("express-validator")

const handleValidationErrors = require("./handleValidationErrors")


const validateLoginInput = [
    check("email")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Email is invalid"),
    check("password")
        .exists({ checkFalsy: true })
        .isLength({ min: 6, max: 30 })
        .withMessage("Password is invalid"),
    handleValidationErrors
]


module.exports = validateLoginInput;

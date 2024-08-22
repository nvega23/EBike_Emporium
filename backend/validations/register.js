const { check } = require("express-validator")
const handleValidationErrors = require("./handleValidationErrors")


const validateRegisterInput = [
    check("email")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Email is invalid"),
    check("username")
        .exists({ checkFalsy: true })
        .isLength({ min: 2, max: 10 })
        .withMessage("Username has to be between 2-10 characters"),
    check("password")
        .exists({ checkFalsy: true })
        .isLength({ min: 6, max: 30 })
        .matches(/[^A-Za-z0-9]/)
        .withMessage("Password must include at least one special character")
        .withMessage("Password has to be between 6-30 characters"),
    handleValidationErrors

]

module.exports = validateRegisterInput

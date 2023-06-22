const { validationResult } = require("express-validator")


const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);


    if (!validationErrors.isEmpty()) {
        const errorsFormatter = ({ msg }) => msg
        const errors = validationErrors.formatWith(errorsFormatter).mapped()

        const err = Error("Validation Error")
        err.errors = errors;
        err.statusCode = 400
        err.title = "Validation Error"
        next(err)
    }
    next()
}

module.exports = handleValidationErrors

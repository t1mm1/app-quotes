const { validationResult } = require("express-validator");

module.exports.validationErrorHandler = (request, responce, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return responce.status(400).json({
            errors: errors.array(),
        });
    }
    next();
};
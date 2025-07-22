const { validationResult } = require('express-validator');

/**
 * Express middleware for handling validation errors from express-validator.
 *
 * Returns HTTP 400 with an array of validation errors if present, otherwise calls next middleware.
 *
 * @function validationErrorHandler
 * @param {import('express').Request} request - Express request object
 * @param {import('express').Response} response - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {void}
 */
module.exports.validationErrorHandler = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};

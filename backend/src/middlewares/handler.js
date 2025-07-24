const { validationResult } = require('express-validator');

/**
 * Express middleware for handling validation errors from express-validator.
 *
 * Returns HTTP 400 with an array of validation errors if present, otherwise calls next middleware.
 *
 * @function handler
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 * @returns {void}
 */
module.exports.handler = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};

const { query, param, body } = require('express-validator');

// Allows lowercase letters, numbers and dashes
const CATEGORY_NAME_REGEX = /^[a-z0-9\-]+$/;

/**
 * Validation rules for GET /quotes route query parameters.
 *
 * @type {Array<import('express-validator').ValidationChain>}
 *
 * @query {number} [limit]
 * @query {number} [offset]
 * @query {string} [author]
 * @query {string} [text]
 * @query {string} [category]
 */
module.exports.getQuotes = [
  query('limit').optional().trim().isInt({ min: 1, max: 50 }),
  query('offset').optional().trim().isInt({ min: 0 }),
  query('author').optional().trim().escape(),
  query('text').optional().trim().escape(),
  query('category')
    .optional()
    .trim()
    .escape()
    .custom((value) =>
      CATEGORY_NAME_REGEX.test(value)
        ? Promise.resolve()
        : Promise.reject(
            'Category can only contain lowercase letters, numbers and dashes.'
          )
    ),
];

/**
 * Validation rule for GET /quotes/:id route param.
 *
 * @type {Array<import('express-validator').ValidationChain>}
 *
 * @param {number} id [id]
 */
module.exports.getQuote = [param('id').trim().isInt({ min: 1 })];

/**
 * Validation rules for GET /quotes/random route query parameters.
 *
 * @type {Array<import('express-validator').ValidationChain>}
 *
 * @query {number} [limit]
 */
module.exports.getRandom = [
  query('limit').optional().trim().isInt({ min: 1, max: 20 }),
];

/**
 * Validation rules for POST /quotes request body.
 *
 * @type {Array<import('express-validator').ValidationChain>}
 *
 * @body {string} text
 * @body {string} author
 * @body {Array<string>} categories
 */
module.exports.postQuote = [
  body('text')
    .trim()
    .isString()
    .isLength({ min: 10 })
    .withMessage('Text is required and has to be minimum 10 characters.'),
  body('author')
    .trim()
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Author must be a string from 2 to 255 characters.'),
  body('categories')
    .isArray({ min: 1 })
    .withMessage('Categories must be an array with at least one category.'),
  body('categories.*')
    .trim()
    .matches(CATEGORY_NAME_REGEX)
    .withMessage(
      'Each category must contain only lowercase letters, numbers and dashes.'
    ),
];

/**
 * Validation rules for PATCH /quotes/:id request body.
 *
 * @type {Array<import('express-validator').ValidationChain>}
 *
 * @body {string} text
 * @body {string} author
 * @body {Array<string>} categories
 */
module.exports.patchQuote = [
  param('id').trim().isInt({ min: 1 }),
  body('text')
    .optional()
    .trim()
    .isString()
    .isLength({ min: 10 })
    .withMessage('Text is required and has to be minimum 10 characters.'),
  body('author')
    .optional()
    .trim()
    .isString()
    .isLength({ min: 2, max: 255 })
    .withMessage('Author must be a string from 2 to 255 characters.'),
  body('categories')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Categories must be an array with at least one category.'),
  body('categories.*')
    .optional()
    .trim()
    .matches(CATEGORY_NAME_REGEX)
    .withMessage(
      'Each category must contain only lowercase letters, numbers and dashes.'
    ),
];

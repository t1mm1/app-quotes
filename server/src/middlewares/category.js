const { query, param } = require('express-validator');

// Allows any letters (case-insensitive), numbers and dashes
const CATEGORY_NAME_I_REGEX = /^[a-z0-9\-]+$/i;

/**
 * Validation rules for GET /categories query parameters.
 *
 * @type {Array<import('express-validator').ValidationChain>}
 *
 * @query {number} [limit]
 * @query {number} [offset]
 * @query {string} [name]
 */
module.exports.getCategories = [
  query('limit').optional().trim().isInt({ min: 1, max: 50 }),
  query('offset').optional().trim().isInt({ min: 0 }),
  query('name')
    .optional()
    .trim()
    .escape()
    .custom((value) =>
      CATEGORY_NAME_I_REGEX.test(value)
        ? Promise.resolve()
        : Promise.reject(
            'Category can only contain letters, numbers and dashes.'
          )
    ),
];

/**
 * Validation rules for GET /categories/:id route param.
 *
 * @type {Array<import('express-validator').ValidationChain>}
 *
 * @param {number} id [id]
 */
module.exports.getCategory = [param('id').trim().isInt({ min: 1 })];

/**
 * Validation rules for GET /categories/random query parameters.
 *
 * @type {Array<import('express-validator').ValidationChain>}
 *
 * @query {number} [limit]
 */
module.exports.getRandom = [
  query('limit').optional().trim().isInt({ min: 1, max: 20 }),
];

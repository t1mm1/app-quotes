const { query, param } = require('express-validator');

// Allows lowercase letters, numbers and dashes
const CATEGORY_NAME_REGEX = /^[a-z0-9\-]+$/;

module.exports.getQuotesQueryValidators = [
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
                'Category can only contain lowercase letters, numbers and dashes'
            )
        ),
];

module.exports.getQuoteParamValidators = [
    param('id').trim().isInt({ min: 1 }),
];

module.exports.getRandomQuotesValidators = [
    query('limit').optional().trim().isInt({ min: 1, max: 20 }),
];

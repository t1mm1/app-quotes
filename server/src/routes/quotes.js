/**
 * Quotes router
 * Handles endpoints for quotes: retrieving, fetching random, fetching by ID, and creating quotes.
 * Includes validation and error-handling middleware.
 */

const express = require('express');

const router = express.Router();
const controller = require('../controllers/quotes');
const validationErrorHandler = require('../middlewares/validationErrorHandler');
const quoteValidators = require('../middlewares/quoteValidators');

/**
 * GET /quotes
 * Retrieve all quotes.
 *
 * @name GetAllQuotes
 * @route {GET} /
 * @middleware {Function} quoteValidators.getQuotesQueryValidators - Validates query parameters
 * @middleware {Function} validationErrorHandler.validationErrorHandler - Handles validation errors
 * @handler {Function} controller.getAllQuotes - Returns all quotes
 */
router.get(
  '/',
  quoteValidators.getQuotesQueryValidators,
  validationErrorHandler.validationErrorHandler,
  controller.getAllQuotes
);

/**
 * GET /quotes/random
 * Retrieve a list of random quotes.
 *
 * @name GetRandomQuotes
 * @route {GET} /random
 * @middleware {Function} quoteValidators.getRandomQuotesValidators - Validates query parameters
 * @middleware {Function} validationErrorHandler.validationErrorHandler - Handles validation errors
 * @handler {Function} controller.getRandomQuotes - Returns random quotes
 */
router.get(
  '/random',
  quoteValidators.getRandomQuotesValidators,
  validationErrorHandler.validationErrorHandler,
  controller.getRandomQuotes
);

/**
 * GET /quotes/:id
 * Retrieve a quote by its ID.
 *
 * @name GetQuoteById
 * @route {GET} /:id
 * @param {string} id - Quote ID
 * @middleware {Function} quoteValidators.getQuoteParamValidators - Validates route parameters
 * @middleware {Function} validationErrorHandler.validationErrorHandler - Handles validation errors
 * @handler {Function} controller.getQuoteById - Returns the quote by ID
 */
router.get(
  '/:id',
  quoteValidators.getQuoteParamValidators,
  validationErrorHandler.validationErrorHandler,
  controller.getQuoteById
);

/**
 * POST /quotes
 * Create a new quote.
 *
 * @name PostQuote
 * @route {POST} /
 * @middleware {Function} quoteValidators.postQuoteValidators - Validates request body
 * @middleware {Function} validationErrorHandler.validationErrorHandler - Handles validation errors
 * @param {object} req.body - Quote data
 * @handler {Function} controller.postQuote - Creates a new quote
 */
router.post(
  '/',
  quoteValidators.postQuoteValidators,
  validationErrorHandler.validationErrorHandler,
  controller.postQuote
);

module.exports = router;

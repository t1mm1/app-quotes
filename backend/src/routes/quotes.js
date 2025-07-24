/**
 * Quotes router
 * Handles endpoints for quotes: retrieving, fetching random, fetching by ID, and creating quotes.
 * Includes validation and error-handling middleware.
 */

const express = require('express');

const router = express.Router();
const controller = require('../controllers/quotes');
const handler = require('../middlewares/handler');
const validators = require('../middlewares/quote');

/**
 * GET /quotes
 * Retrieve all quotes.
 *
 * @name GetQuotes
 * @route {GET} /
 * @middleware {Function}
 * @middleware {Function}
 * @handler {Function}
 */
router.get('/', validators.getQuotes, handler.handler, controller.getQuotes);

/**
 * GET /quotes/random
 * Retrieve a list of random quotes.
 *
 * @name GetRandom
 * @route {GET} /random
 * @middleware {Function}
 * @middleware {Function}
 * @handler {Function}
 */
router.get(
  '/random',
  validators.getRandom,
  handler.handler,
  controller.getRandom
);

/**
 * GET /quotes/:id
 * Retrieve a quote by its ID.
 *
 * @name GetQuote
 * @route {GET} /:id
 * @param {string} id - Quote ID
 * @middleware {Function}
 * @middleware {Function}
 * @handler {Function}
 */
router.get('/:id', validators.getQuote, handler.handler, controller.getQuote);

/**
 * POST /quotes
 * Create a new quote.
 *
 * @name PostQuote
 * @route {POST} /
 * @middleware {Function}
 * @middleware {Function}
 * @param {object} req.body
 * @handler {Function}
 */
router.post('/', validators.postQuote, handler.handler, controller.postQuote);

/**
 * DELETE /quotes/:id
 * Delete quote by ID.
 *
 * @name PostQuote
 * @route {DELETE} /:id
 * @middleware {Function}
 * @middleware {Function}
 * @param {string} id
 * @handler {Function}
 */
router.delete(
  '/:id',
  validators.getQuote,
  handler.handler,
  controller.deleteQuote
);

/**
 * DELETE /quotes/:id
 * Delete quote by ID.
 *
 * @name PostQuote
 * @route {DELETE} /:id
 * @middleware {Function}
 * @middleware {Function}
 * @param {string} id
 * @handler {Function}
 */
router.patch(
  '/:id',
  validators.patchQuote,
  handler.handler,
  controller.patchQuote
);

module.exports = router;

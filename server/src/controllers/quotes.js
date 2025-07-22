const quoteService = require('../services/quote');

/**
 * Controller to get all quotes.
 *
 * @async
 * @function getAllQuotes
 * @param {import('express').Request} request - Express request object (query: limit, offset, author, text, category)
 * @param {import('express').Response} response - Express response object
 * @returns {Promise<void>}
 *
 * @example
 * // GET /quotes?limit=10&offset=0&author=twain&text=life&category=science
 */
module.exports.getAllQuotes = async (request, response) => {
  const { limit = 5, offset = 0, author, text, category } = request.query;

  try {
    const quotes = await quoteService.findQuotes(
      limit,
      offset,
      author,
      text,
      category
    );
    response.json(quotes);
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Controller to get a quote by its ID.
 *
 * @async
 * @function getQuoteById
 * @param {import('express').Request} request - Express request object (params: id)
 * @param {import('express').Response} response - Express response object
 * @returns {Promise<void>}
 *
 * @example
 * // GET /quotes/23
 */
module.exports.getQuoteById = async (request, response) => {
  const id = request.params.id;

  try {
    const quote = await quoteService.findSingleQuote(id);
    if (quote) {
      response.json(quote);
    } else {
      response.status(404).json({
        message: `Quote with ID ${id} not found.`,
      });
    }
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Controller to get a list of random quotes.
 *
 * @async
 * @function getRandomQuotes
 * @param {import('express').Request} request - Express request object (query: limit)
 * @param {import('express').Response} response - Express response object
 * @returns {Promise<void>}
 *
 * @example
 * // GET /quotes/random?limit=3
 */
module.exports.getRandomQuotes = async (request, response) => {
  const { limit = 5 } = request.query;

  try {
    const quotes = await quoteService.findRandomQuotes(limit);
    response.json(quotes);
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Controller to create a new quote.
 *
 * @async
 * @function postQuote
 * @param {import('express').Request} request - Express request object (body: text, author, categories)
 * @param {import('express').Response} response - Express response object
 * @returns {Promise<void>}
 *
 * @example
 * // POST /quotes
 * // body: { "text": "Life is beautiful.", "author": "Unknown", "categories": ["life"] }
 */
module.exports.postQuote = async (request, response) => {
  const { text, author, categories } = request.body;

  try {
    const quote = await quoteService.createQuote({ text, author, categories });
    response.status(200).json(quote);
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

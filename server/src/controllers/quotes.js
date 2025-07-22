const service = require('../services/quote');

/**
 * Controller to get all quotes.
 *
 * @async
 * @function getQuotes
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @returns {Promise<void>}
 *
 * @example
 * // GET /quotes?limit=10&offset=0&author=twain&text=life&category=science
 */
module.exports.getQuotes = async (request, response) => {
  const { limit = 5, offset = 0, author, text, category } = request.query;

  try {
    const quotes = await service.getQuotes({
      limit,
      offset,
      author,
      text,
      category,
    });
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
 * @function getQuote
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @returns {Promise<void>}
 *
 * @example
 * // GET /quotes/23
 */
module.exports.getQuote = async (request, response) => {
  const id = request.params.id;

  try {
    const quote = await service.getQuote({ id });
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
 * @function getRandom
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @returns {Promise<void>}
 *
 * @example
 * // GET /quotes/random?limit=3
 */
module.exports.getRandom = async (request, response) => {
  const { limit = 5 } = request.query;

  try {
    const quotes = await service.getRandom({ limit });
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
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @returns {Promise<void>}
 *
 * @example
 * // POST /quotes
 * // body: { "text": "Life is beautiful.", "author": "Unknown", "categories": ["life"] }
 */
module.exports.postQuote = async (request, response) => {
  const { text, author, categories } = request.body;

  try {
    const quote = await service.createQuote({ text, author, categories });
    response.status(200).json(quote);
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Controller to delete a quote by its ID.
 *
 * @async
 * @function deleteQuote
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @returns {Promise<void>}
 *
 * @example
 * // DELETE /quotes/23
 */
module.exports.deleteQuote = async (request, response) => {
  const id = request.params.id;

  try {
    const deleted = await service.deleteQuote({ id });

    if (deleted) {
      response.status(200).json({
        message: `Quote with ID ${deleted} was deleted.`,
      });
    } else {
      response.status(404).json({
        message: `Quote with ID ${id} was not found.`,
      });
    }
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Controller to patch/edit an quote.
 *
 * @async
 * @function patchQuote
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @returns {Promise<void>}
 *
 * @example
 * // PATCH /quote/:id
 * // body: { "text": "Life is beautiful.", "author": "Unknown", "categories": ["life"] }
 */
module.exports.patchQuote = async (request, response) => {
  const { text, author, categories } = request.body;
  const id = request.params.id;

  try {
    const quote = await service.editQuote({
      id,
      text,
      author,
      categories,
    });
    response.status(200).json(quote);
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

const service = require('../services/categories');

/**
 * Controller to get all categories.
 *
 * @async
 * @function getCategories
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @returns {Promise<void>}
 *
 * @example
 * // GET /categories?limit=10&offset=0&name=books
 */
module.exports.getCategories = async (request, response) => {
  const { limit = 5, offset = 0, name } = request.query;

  try {
    const quotes = await service.getCategories({
      limit,
      offset,
      name,
    });
    response.json(quotes);
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Controller to get category by its ID.
 *
 * @async
 * @function getCategory
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @returns {Promise<void>}
 *
 * @example
 * // GET /categories/10
 */
module.exports.getCategory = async (request, response) => {
  const { id } = request.params;

  try {
    const category = await service.getCategory({ id });
    if (category) {
      response.json(category);
    } else {
      response.status(404).json({
        message: `Category with ID ${id} not found.`,
      });
    }
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

/**
 * Controller to get random categories.
 *
 * @async
 * @function getRandom
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @returns {Promise<void>}
 *
 * @example
 * // GET /categories/random?limit=3
 */
module.exports.getRandom = async (request, response) => {
  const { limit = 5 } = request.query;

  try {
    const categories = await service.getRandom({ limit });
    response.json(categories);
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

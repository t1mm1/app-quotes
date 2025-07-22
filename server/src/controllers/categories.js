const categoriesService = require('../services/categories');

/**
 * Controller to get all categories.
 *
 * @async
 * @function getAllCategories
 * @param {import('express').Request} request - Express request object (query: limit, offset, name)
 * @param {import('express').Response} response - Express response object
 * @returns {Promise<void>}
 *
 * @example
 * // GET /categories?limit=10&offset=0&name=books
 */
module.exports.getAllCategories = async (request, response) => {
  const { limit = 5, offset = 0, name } = request.query;

  try {
    const quotes = await categoriesService.findCategories({
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
 * @function getCategoryById
 * @param {import('express').Request} request - Express request object (params: id)
 * @param {import('express').Response} response - Express response object
 * @returns {Promise<void>}
 *
 * @example
 * // GET /categories/10
 */
module.exports.getCategoryById = async (request, response) => {
  const { id } = request.params;

  try {
    const category = await categoriesService.findSingleCategory({ id });
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
 * @function getRandomCategories
 * @param {import('express').Request} request - Express request object (query: limit)
 * @param {import('express').Response} response - Express response object
 * @returns {Promise<void>}
 *
 * @example
 * // GET /categories/random?limit=3
 */
module.exports.getRandomCategories = async (request, response) => {
  const { limit = 5 } = request.query;

  try {
    const categories = await categoriesService.findRandomCategories({ limit });
    response.json(categories);
  } catch (error) {
    response.status(500).json({
      message: error.message,
    });
  }
};

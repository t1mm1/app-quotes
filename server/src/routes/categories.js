/**
 * Categories router
 * Handles categories endpoints such as retrieving all categories, a random selection, or a single category by ID.
 * Uses validation and error handling middleware.
 */

const express = require('express');

const router = express.Router();
const controller = require('../controllers/categories');
const handler = require('../middlewares/handler');
const validators = require('../middlewares/category');

/**
 * GET /categories
 * Returns a list of all categories.
 *
 * @name getCategories
 * @route {GET} /
 * @middleware {Function} validators.getCategories - Validates query parameters
 * @middleware {Function} handler.handler - Handles validation errors
 * @handler {Function} controller.getCategories - Returns categories
 */
router.get(
  '/',
  validators.getCategories,
  handler.handler,
  controller.getCategories
);

/**
 * GET /categories/random
 * Returns a list of random categories.
 *
 * @name getRandom
 * @route {GET} /random
 * @middleware {Function} validators.getRandom - Validates query parameters
 * @middleware {Function} handler.handler - Handles validation errors
 * @handler {Function} controller.getRandom - Returns random categories
 */
router.get(
  '/random',
  validators.getRandom,
  handler.handler,
  controller.getRandom
);

/**
 * GET /categories/:id
 * Returns a category by its ID.
 *
 * @name getCategory
 * @route {GET} /:id
 * @middleware {Function} validators.getCategory - Validates route parameters
 * @middleware {Function} handler.handler - Handles validation errors
 * @handler {Function} controller.getCategory - Returns category by id
 */
router.get(
  '/:id',
  validators.getCategory,
  handler.handler,
  controller.getCategory
);

module.exports = router;

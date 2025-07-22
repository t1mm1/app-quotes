/**
 * Categories router
 * Handles categories endpoints such as retrieving all categories, a random selection, or a single category by ID.
 * Uses validation and error handling middleware.
 */

const express = require('express');

const router = express.Router();
const controller = require('../controllers/categories');
const validationErrorHandler = require('../middlewares/validationErrorHandler');
const categoryValidators = require('../middlewares/categoryValidators');

/**
 * GET /categories
 * Returns a list of all categories.
 *
 * @name GetAllCategories
 * @route {GET} /
 * @middleware {Function} categoryValidators.getCategoriesQueryValidators - Validates query parameters
 * @middleware {Function} validationErrorHandler.validationErrorHandler - Handles validation errors
 * @handler {Function} controller.getAllCategories - Returns categories
 */
router.get(
  '/',
  categoryValidators.getCategoriesQueryValidators,
  validationErrorHandler.validationErrorHandler,
  controller.getAllCategories
);

/**
 * GET /categories/random
 * Returns a list of random categories.
 *
 * @name GetRandomCategories
 * @route {GET} /random
 * @middleware {Function} categoryValidators.getRandomCategoriesValidators - Validates query parameters
 * @middleware {Function} validationErrorHandler.validationErrorHandler - Handles validation errors
 * @handler {Function} controller.getRandomCategories - Returns random categories
 */
router.get(
  '/random',
  categoryValidators.getRandomCategoriesValidators,
  validationErrorHandler.validationErrorHandler,
  controller.getRandomCategories
);

/**
 * GET /categories/:id
 * Returns a category by its ID.
 *
 * @name GetCategoryById
 * @route {GET} /:id
 * @middleware {Function} categoryValidators.getCategoryParamValidators - Validates route parameters
 * @middleware {Function} validationErrorHandler.validationErrorHandler - Handles validation errors
 * @handler {Function} controller.getCategoryById - Returns category by id
 */
router.get(
  '/:id',
  categoryValidators.getCategoryParamValidators,
  validationErrorHandler.validationErrorHandler,
  controller.getCategoryById
);

module.exports = router;

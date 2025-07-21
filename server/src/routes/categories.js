const express = require('express');

const router = express.Router();
const controller = require('../controllers/categories');
const validationErrorHandler = require('../middlewares/validationErrorHandler');
const categoryValidators = require('../middlewares/categoryValidators');

// Get all categories.
router.get(
    '/',
    categoryValidators.getCategoriesQueryValidators,
    validationErrorHandler.validationErrorHandler,
    controller.getAllCategories,
);

// Get random categories.
router.get(
    '/random',
    categoryValidators.getRandomCategoriesValidators,
    validationErrorHandler.validationErrorHandler,
    controller.getRandomCategories,
);

// Get category by ID.
router.get(
    '/:id',
    categoryValidators.getCategoryParamValidators,
    validationErrorHandler.validationErrorHandler,
    controller.getCategoryById,
);


module.exports = router;
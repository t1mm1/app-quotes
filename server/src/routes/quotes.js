const express = require('express');

const router = express.Router();
const controller = require('../controllers/quotes');
const validationErrorHandler = require('../middlewares/validationErrorHandler');
const quoteValidators = require('../middlewares/quoteValidators');

// Get all quotes.
router.get(
    '/', 
    quoteValidators.getQuotesQueryValidators,
    validationErrorHandler.validationErrorHandler,
    controller.getAllQuotes,
);

// Get random quotes.
router.get(
    '/random',
    quoteValidators.getRandomQuotesValidators,
    validationErrorHandler.validationErrorHandler,
    controller.getRandomQuotes,
);

// Get quote by ID.
router.get(
    '/:id', 
    quoteValidators.getQuoteParamValidators,
    validationErrorHandler.validationErrorHandler,
    controller.getQuoteById,
);

module.exports = router;
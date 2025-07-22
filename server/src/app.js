/**
 * Main Express application setup.
 * Initializes the Express app, sets up JSON body parsing,
 * and mounts the quotes and categories routers.
 */

const express = require('express');
const routeQuotes = require('./routes/quotes');
const routeCategories = require('./routes/categories');

const app = express();

/**
 * Parse incoming request bodies as JSON.
 */
app.use(express.json());

/**
 * Routes for quotes resources.
 * All routes under /quotes are handled by the quotes router.
 */
app.use('/quotes', routeQuotes);

/**
 * Routes for categories resources.
 * All routes under /categories are handled by the categories router.
 */
app.use('/categories', routeCategories);

module.exports = app;

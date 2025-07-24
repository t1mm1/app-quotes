/**
 * Main Express application setup.
 * Initializes the Express app, sets up JSON body parsing,
 * and mounts the quotes and categories routers.
 */

const express = require('express');
const quotes = require('./routes/quotes');
const categories = require('./routes/categories');
const cors = require('./middlewares/cors');

const app = express();

/**
 * Add cors policy.
 */
app.use(cors);

/**
 * Parse incoming request bodies as JSON.
 */
app.use(express.json());

/**
 * Routes for quotes resources.
 * All routes under /quotes are handled by the quotes router.
 */
app.use('/quotes', quotes);

/**
 * Routes for categories resources.
 * All routes under /categories are handled by the categories router.
 */
app.use('/categories', categories);

module.exports = app;

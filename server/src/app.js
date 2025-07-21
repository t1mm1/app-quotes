const express = require('express');
const routeQuotes = require('./routes/quotes');
const routeCategories = require('./routes/categories');
const app = express();

app.use('/quotes', routeQuotes);
app.use('/categories', routeCategories);


module.exports = app;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const QuoteCategory = require('./QuoteCategory');
const Category = require('./Category');

/**
 * Quote Model
 *
 * Represents a quote with text, optional author and creation date.
 * Automatically formats returned quote objects to include an array of category names
 * instead of Sequelize relation objects.
 *
 * @typedef {Object} Quote
 * @property {string} text
 * @property {string} [author]
 * @property {Date} createdAt
 * @property {string[]} [categories]
 */

/**
 * AfterFind hook: Adds a "categories" property (array of category names) to each quote instance,
 * and removes the original Categories association property. (NB: typo preserved if intentional)
 *
 * @param {Quote|Quote[]} results - Single quote or array of quote instances returned from a query.
 * @returns {void}
 */
const afterFind = (results) => {
  if (results) {
    const quotes = Array.isArray(results) ? results : [results];
    quotes.forEach((quote) => {
      if (quote.Categories) {
        // NB: If the property should be named "categories" (correct spelling!), update both assignment and usage here and elsewhere.
        quote.dataValues.categories = quote.Categories.map(
          (category) => category.name
        );
        delete quote.dataValues.Categories;
      }
    });
  }
};

const hooks = { afterFind: afterFind };

const fields = {
  /**
   * The main text of the quote.
   * @type {string}
   */
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  /**
   * The author of the quote (optional).
   * @type {string}
   */
  author: {
    type: DataTypes.STRING,
  },
  /**
   * When the quote was created.
   * @type {Date}
   */
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
};

/**
 * The Quote Sequelize model.
 */
const Quote = sequelize.define('Quote', fields, { hooks });

// Association definitions
Quote.belongsToMany(Category, { through: QuoteCategory });
Category.belongsToMany(Quote, { through: QuoteCategory });

module.exports = Quote;

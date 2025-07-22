const sequelize = require('../config/database');

/**
 * QuoteCategory Model
 *
 * Through/junction table for many-to-many association between Quote and Category.
 *
 * @typedef {Object} QuoteCategory
 * @property {number} QuoteId - Foreign key referencing the Quote.
 * @property {number} CategoryId - Foreign key referencing the Category.
 */

const QuoteCategory = sequelize.define(
  'QuoteCategory',
  {
    // This table has no additional attributes except foreign keys.
  },
  {
    indexes: [
      { name: 'QuoteCategory_QuoteId', fields: ['QuoteId'] },
      { name: 'QuoteCategory_CategoryId', fields: ['CategoryId'] },
    ],
  }
);

module.exports = QuoteCategory;

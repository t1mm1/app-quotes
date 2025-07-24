const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * Category Model
 *
 * Represents a category for quotes.
 *
 * @typedef {Object} Category
 * @property {string} name - The unique name of the category
 */
const Category = sequelize.define('Category', {
  /**
   * The unique name of the category.
   * @type {string}
   */
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Category;

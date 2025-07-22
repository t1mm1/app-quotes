const { Op } = require('sequelize');
const Category = require('../models/Category');
const sequelize = require('../config/database');

const attributes = { exclude: ['createdAt', 'updatedAt'] };

/**
 * Retrieves a list of categories with optional filters and pagination.
 *
 * @async
 * @function findCategories
 * @param {number} [limit] - Maximum number of categories to retrieve.
 * @param {number} [offset] - Number of categories to skip (for pagination).
 * @param {string} [name] - Filter by category name (substring match).
 * @returns {Promise<Array<Category>>} List of category instances.
 */
module.exports.findCategories = async ({ limit, offset, name }) => {
  const whereClause = {};
  name && (whereClause.name = { [Op.like]: `%${name}%` });

  return await Category.findAll({
    attributes: attributes,
    limit: limit,
    offset: offset,
    order: [['id', 'ASC']],
    where: whereClause,
  });
};

/**
 * Retrieves a single category by its unique ID.
 *
 * @async
 * @function findSingleCategory
 * @param {number|string} id - The unique identifier of the category.
 * @returns {Promise<Category|null>} The category instance or null if not found.
 */
module.exports.findSingleCategory = async ({ id }) => {
  return await Category.findByPk(id, {
    attributes: attributes,
  });
};

/**
 * Retrieves a list of random categories.
 *
 * @async
 * @function findRandomCategories
 * @param {number} limit - Maximum number of random categories to retrieve.
 * @returns {Promise<Array<Category>>} List of random category instances.
 */
module.exports.findRandomCategories = async ({ limit }) => {
  return await Category.findAll({
    attributes: attributes,
    limit: limit,
    order: sequelize.random(),
  });
};

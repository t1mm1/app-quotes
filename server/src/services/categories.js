const { Op } = require('sequelize');
const Category = require('../models/Category');
const sequelize = require('../config/database');

const attributes = { exclude: ['createdAt', 'updatedAt'] };

/**
 * Retrieves a list of categories with optional filters and pagination.
 *
 * @async
 * @function getCategories
 * @param {number} [limit]
 * @param {number} [offset]
 * @param {string} [name]
 * @returns {Promise<Array<Category>>}
 */
module.exports.getCategories = async ({ limit, offset, name }) => {
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
 * @function getCategory
 * @param {number|string} id
 * @returns {Promise<Category|null>}
 */
module.exports.getCategory = async ({ id }) => {
  return await Category.findByPk(id, {
    attributes: attributes,
  });
};

/**
 * Retrieves a list of random categories.
 *
 * @async
 * @function getRandom
 * @param {number} limit
 * @returns {Promise<Array<Category>>}
 */
module.exports.getRandom = async ({ limit }) => {
  return await Category.findAll({
    attributes: attributes,
    limit: limit,
    order: sequelize.random(),
  });
};

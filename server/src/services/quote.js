const { Op } = require('sequelize');
const Category = require('../models/Category');
const Quote = require('../models/Quote');
const sequelize = require('../config/database');

const attributes = { exclude: ['createdAt', 'updatedAt'] };
const includeCategoryConfig = {
  model: Category,
  attributes: ['name'],
  through: { attributes: [] },
};

/**
 * Retrieves a list of quotes with optional filters and pagination.
 *
 * @async
 * @function findQuotes
 * @param {number} [limit] - Maximum number of quotes to retrieve.
 * @param {number} [offset] - Number of quotes to skip (for pagination).
 * @param {string} [author] - Filter by author name (substring match).
 * @param {string} [text] - Filter by quote text (substring match).
 * @param {string} [category] - Filter by category name.
 * @returns {Promise<Array<Quote>>} List of quote instances.
 */
module.exports.findQuotes = async (limit, offset, author, text, category) => {
  const whereClause = {};
  author && (whereClause.author = { [Op.like]: `%${author}%` });
  text && (whereClause.text = { [Op.like]: `%${text}%` });

  let quotes = await Quote.findAll({
    attributes: attributes,
    limit: limit,
    offset: offset,
    order: [['id', 'ASC']],
    include: {
      ...includeCategoryConfig,
      where: category ? { name: category } : {},
    },
    where: whereClause,
  });

  // TODO: Try to find the way to filter by category name and find
  // names of all categories for the quote in one DB request
  if (category) {
    const ids = quotes.map((quote) => quote.id);
    quotes = await Quote.findAll({
      attributes,
      order: [['id', 'ASC']],
      include: includeCategoryConfig,
      where: { id: ids },
    });
  }

  return quotes;
};

/**
 * Retrieves a single quote by its unique ID.
 *
 * @async
 * @function findSingleQuote
 * @param {number|string} id - The unique identifier of the quote.
 * @returns {Promise<Quote|null>} The quote instance or null if not found.
 */
module.exports.findSingleQuote = async (id) => {
  return await Quote.findByPk(id, {
    attributes: attributes,
    include: includeCategoryConfig,
  });
};

/**
 * Retrieves a list of random quotes.
 *
 * @async
 * @function findRandomQuotes
 * @param {number} limit - Maximum number of random quotes to retrieve.
 * @returns {Promise<Array<Quote>>} List of random quote instances.
 */
module.exports.findRandomQuotes = async (limit) => {
  return await Quote.findAll({
    attributes: attributes,
    limit: limit,
    order: sequelize.random(),
    include: includeCategoryConfig,
  });
};

/**
 * Creates a new quote and associates it with categories.
 *
 * @async
 * @function createQuote
 * @param {Object} quoteData - Data for the new quote.
 * @param {string} quoteData.text - The quote text.
 * @param {string} quoteData.author - The author of the quote.
 * @param {Array<string>} quoteData.categories - Array of categories to associate with the quote.
 * @returns {Promise<Quote>} The created quote instance.
 */
module.exports.createQuote = async ({ text, author, categories }) => {
  const id = await sequelize.transaction(async (t) => {
    const quote = await Quote.create({ text, author }, { transaction: t });

    const categoriesInstance = await Promise.all(
      categories.map((name) =>
        Category.findOrCreate({
          where: { name },
          transaction: t,
        }).then(([category]) => category)
      )
    );

    await quote.setCategories(categoriesInstance, { transaction: t });

    return quote.id;
  });

  return await this.findSingleQuote(id);
};

const { Op } = require('sequelize');
const Category = require('../models/Category');
const Quote = require('../models/Quote');
const sequelize = require('../config/database');

const attributes = { exclude: ['createdAt', 'updatedAt'] };
const include = {
  model: Category,
  attributes: ['name'],
  through: { attributes: [] },
};

/**
 * Create categories.
 */
module.exports.createCategories = async ({ categories, transaction }) => {
  return await Promise.all(
    categories.map((name) =>
      Category.findOrCreate({
        where: { name },
        transaction: transaction,
      }).then(([category]) => category)
    )
  );
};

/**
 * Retrieves a list of quotes with optional filters and pagination.
 *
 * @async
 * @function getQuotes
 * @param {number} [limit]
 * @param {number} [offset]
 * @param {string} [author]
 * @param {string} [text]
 * @param {string} [category]
 * @returns {Promise<Array<Quote>>}
 */
module.exports.getQuotes = async ({
  limit,
  offset,
  author,
  text,
  category,
}) => {
  const whereClause = {};
  author && (whereClause.author = { [Op.like]: `%${author}%` });
  text && (whereClause.text = { [Op.like]: `%${text}%` });

  let quotes = await Quote.findAll({
    attributes: attributes,
    limit: limit,
    offset: offset,
    order: [['id', 'ASC']],
    include: {
      ...include,
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
      include: include,
      where: { id: ids },
    });
  }

  return quotes;
};

/**
 * Retrieves a single quote by its unique ID.
 *
 * @async
 * @function getQuote
 * @param {number|string} id
 * @returns {Promise<Quote|null>}
 */
module.exports.getQuote = async ({ id }) => {
  return await Quote.findByPk(id, {
    attributes: attributes,
    include: include,
  });
};

/**
 * Retrieves a list of random quotes.
 *
 * @async
 * @function getRandom
 * @param {number} limit
 * @returns {Promise<Array<Quote>>}
 */
module.exports.getRandom = async ({ limit }) => {
  return await Quote.findAll({
    attributes: attributes,
    limit: limit,
    order: sequelize.random(),
    include: include,
  });
};

/**
 * Creates a new quote and associates it with categories.
 *
 * @async
 * @function createQuote
 * @param {Object} quoteData
 * @param {string} quoteData.text
 * @param {string} quoteData.author
 * @param {Array<string>} quoteData.categories
 * @returns {Promise<Quote>}
 */
module.exports.createQuote = async ({ text, author, categories }) => {
  const created = await sequelize.transaction(async (t) => {
    const quote = await Quote.create({ text, author }, { transaction: t });
    const instance = await this.createCategories({ categories, t });
    await quote.setCategories(instance, { transaction: t });

    return quote.id;
  });

  return await this.getQuote({ id: created });
};

/**
 * Delete a single quote by its unique ID.
 *
 * @async
 * @function deleteQuote
 * @param {number|string} id
 */
module.exports.deleteQuote = async ({ id }) => {
  const count = await Quote.destroy({ where: { id } });
  if (count) {
    return id;
  }
};

/**
 * Edit an quote and associates it with categories.
 *
 * @async
 * @function editQuote
 * @param {Object} quoteData
 * @param {string} quoteData.text
 * @param {string} quoteData.author
 * @param {Array<string>} quoteData.categories
 * @returns {Promise<Quote>}
 */
module.exports.editQuote = async ({ id, text, author, categories }) => {
  const modified = await sequelize.transaction(async (t) => {
    const quote = await Quote.findByPk(id, {
      attributes: attributes,
      include: include,
      transaction: t,
    });

    if (!quote) {
      return null;
    }

    if (text) {
      quote.text = text;
    }

    if (author) {
      quote.author = author;
    }

    await quote.save({ transaction: t });

    if (categories) {
      const instance = await this.createCategories({ categories, t });
      await quote.setCategories(instance, { transaction: t });
    }

    return quote.id;
  });

  return await this.getQuote({ id: modified });
};
